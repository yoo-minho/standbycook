const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');
const config = require('../config/key')
const { Client } = require('pg');

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "upload_files/recipe_images"); 
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb)=>{
        const ext = path.extname(file.originalname)
        if(ext == '.jpg' || ext == '.png' ){
            return cb(null, true)
        } else {
            return cb(res.status(400).end('only jpg, png is allowed'), false);
        }
    }
})

const upload = multer({storage:storage}).single("file");

function json2query(dataJson){
    let tmpQuery = "";
    if("INSERT" === dataJson.mode ){
        tmpQuery = `INSERT INTO ${dataJson.tableName} (${dataJson.column.join(',')}) VALUES (${dataJson.value.join(',')}) RETURNING *;`;
    } else if ( "INSERT-SELECT" === dataJson.mode ){
        tmpQuery = `INSERT INTO ${dataJson.tableName} (${dataJson.column.join(',')}) SELECT ${dataJson.value.join(',')} from (${dataJson.dummy}) dummy where 1=1 ${dataJson.where} RETURNING *;`;
    } else if ( "SELECT" === dataJson.mode ){
        tmpQuery = `SELECT ${dataJson.column.join(',')} FROM ${dataJson.tableName} WHERE 1=1 ${dataJson.where};`;
    } else if ( "SUBQUERY" === dataJson.mode ){
        tmpQuery = `(SELECT ${dataJson.column.join(',')} FROM ${dataJson.tableName} WHERE 1=1 ${dataJson.where} limit 1)`;
    }
    return tmpQuery;
}

router.post('/uploadImage', (req, res) => {
    upload(req, res, err => {
        if(err){
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })
});

router.post('/getList', (req, res) => {

    const client = new Client(config.postgresqlInfo);
    client.connect();

    const sql1 = json2query({
        tableName : 'recipe',
        mode : 'SELECT',
        column : ["("+json2query({tableName : 'recipe_step', mode : 'SUBQUERY', column:["url"], where : "and recipe_srno = recipe.recipe_srno and title_url_yn = 'Y'"})+")", 
                    'recipe_srno', 'recipe_srno', 'title', 'register_id', 'description', 'coalesce(views,0)', 'register_datetime', 'register_id'],
        where : "order by register_datetime desc limit 20"
    })
    const values1 = [];

    client.query(sql1, values1, (err1, qres1) => {
        if(err1){
            console.log(sql1);
            console.log(values1);
            console.log(err1);
            client.end();
            return;
        } 
        client.end();
        res.status(200).json({success:true, qres1});
    });
});



router.post('/add', (req, res) => {
    
    const client = new Client(config.postgresqlInfo);
    client.connect();

    const sql = json2query({
        tableName : 'recipe',
        mode : 'INSERT',
        column : ['recipe_srno', 'title', 'register_datetime', 'register_id', 'description'],
        value : ["nextval('sq_recipe_srno')", '$1', "to_char(now(), 'yyyymmddhh24miss')", '$2', '$3']
    })
    const values = [req.body.title, 'dellose', req.body.description];

    let values1 = [];   
    let dummy1 = "";
    req.body.steps.forEach(function(item, i){
        dummy1 += `\n select $${4*i+2} as title, $${4*i+3} as description, $${4*i+4} as url, $${4*i+5} as title_url_yn union`;
        values1.push(item.title);
        values1.push(item.description);
        values1.push(item.url);
        values1.push(item.title_url_yn);
    });   
    dummy1 += `\n select '' as title, '' as description, '' as url, '' as title_url_yn`;

    const sql1 = json2query({
        tableName : 'recipe_step',
        mode : 'INSERT-SELECT',
        column : ['recipe_step_srno', 'recipe_srno', 'title', 'description', 'url', 'sequence','title_url_yn'],
        value : ["nextval('sq_recipe_step_srno')", "$1", "dummy.title", "dummy.description", "dummy.url","(ROW_NUMBER() OVER()) as row_num","dummy.title_url_yn"],
        dummy : dummy1,
        where : "\nand dummy.title != ''"
    })

    client.query(sql, values, (err, qres) => {
        if(err){
            console.log(sql);
            console.log(values);
            console.log(err);
            client.end();
            return;
        } 
        values1 = [qres.rows[0].recipe_srno, ...values1];
        client.query(sql1, values1, (err1, qres1) => {
            if(err1){
                console.log(sql1);
                console.log(values1);
                console.log(err1);
                client.end();
                return;
            } 
            client.end();
            var qresTotal  = {first:qres,second:qres1}
            res.status(200).json({success:true, qresTotal});
        });
    });

});

module.exports = router; 