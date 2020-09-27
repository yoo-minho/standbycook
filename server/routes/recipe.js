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
    const tmpTableName = dataJson.tableName;
    const tmpColumns = dataJson.column && dataJson.column.join(',');
    const tmpValues = dataJson.value && dataJson.value.join(',');
    const tmpWheres = dataJson.where && dataJson.where.join(' ');
    if("INSERT" === dataJson.mode ){
        tmpQuery = `INSERT INTO ${tmpTableName} (${tmpColumns}) VALUES (${tmpValues}) RETURNING *;`;
    } else if ( "INSERT-SELECT" === dataJson.mode ){
        tmpQuery = `INSERT INTO ${tmpTableName} (${tmpColumns}) SELECT ${tmpValues} FROM (${dataJson.dummy}) dummy WHERE 1=1 ${tmpWheres} RETURNING *;`;
    } else if ( "SELECT" === dataJson.mode ){
        tmpQuery = `SELECT ${tmpColumns} FROM ${tmpTableName} WHERE 1=1 ${tmpWheres};`;
    } else if ( "SUBQUERY" === dataJson.mode ){
        tmpQuery = `(SELECT ${tmpColumns} FROM ${tmpTableName} WHERE 1=1 ${tmpWheres})`;
    } else {
        //pass
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

router.post('/getRecipeDetailBySrno', (req, res) => {

    const client = new Client(config.postgresqlInfo);
    client.connect();

    const tDynamic = json2query({mode : 'SUBQUERY', tableName : 'recipe_step', column:["title", "description", "url"], where : ["and recipe_srno = $1","order by sequence"]});
    const stepsDynamic = json2query({mode : 'SUBQUERY', tableName : tDynamic+' as t', column:["array_to_json(array_agg(row_to_json(t)))"], where : ["and 1=1"]});
    const t2Dynamic = json2query({mode : 'SUBQUERY', tableName : 'recipe_link_grocery rlg left outer join grocery gc on gc.grocery_srno = rlg.grocery_srno', 
                    column:["rlg.grocery_srno as srno", "rlg.grocery_amount as amount","coalesce(gc.grocery_name,'') as name","coalesce(gc.grocery_unit_name,'그램') as unit"], where : ["and recipe_srno = $1"]});
    const grocerysDynamic = json2query({mode : 'SUBQUERY', tableName : t2Dynamic+' as t2', column:["array_to_json(array_agg(row_to_json(t2)))"], where : ["and 1=1"]});
    const sql1 = json2query({ mode : 'SELECT', tableName : 'recipe', column : [grocerysDynamic+' as grocerys', stepsDynamic+' as steps', '*'], where : ["and recipe_srno = $1"]})
    const values1 = [req.body.recipe_srno];

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

router.post('/getRecipeListBySrno', (req, res) => {

    const client = new Client(config.postgresqlInfo);
    client.connect();

    const urlDynamic = json2query({mode : 'SUBQUERY', tableName : 'recipe_step', column:["url"], where : ["and recipe_srno = recipe.recipe_srno","and title_url_yn = 'Y'","limit 1"]});
    const sql1 = json2query({
        mode : 'SELECT',
        tableName : 'recipe',  
        column : [urlDynamic, 'recipe_srno', 'recipe_srno', 'title', 'register_id', 'coalesce(min,0) as min', 'coalesce(views,0) as views', 'register_datetime', 'register_id'],
        where : ["and recipe_srno = $1","limit 1"]
    })
    const values1 = [req.body.recipe_srno];

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

router.post('/getRecipeList', (req, res) => {

    const client = new Client(config.postgresqlInfo);
    client.connect();

    const urlDynamic = json2query({mode : 'SUBQUERY', tableName : 'recipe_step', column:["url"], where : ["and recipe_srno = recipe.recipe_srno","and title_url_yn = 'Y'"]});
    const sql1 = json2query({
        mode : 'SELECT',
        tableName : 'recipe',
        column : [urlDynamic, 'recipe_srno', 'recipe_srno', 'title', 'register_id', 'coalesce(min,0) as min', 'coalesce(views,0) as views', 'register_datetime', 'register_id'],
        where : ["order by register_datetime desc","limit 20"]
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

router.post('/getGroceryList', (req, res) => {

    const client = new Client(config.postgresqlInfo);
    client.connect();

    const sql1 = json2query({mode : 'SELECT', tableName : 'grocery', column : ['grocery_srno', 'grocery_name', 'grocery_category', "(grocery_unit_name||' ('||grocery_unit_per_gram||'g)') as unit"], where : [""]})
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

router.post('/addRecipe', (req, res) => {
    
    const client = new Client(config.postgresqlInfo);
    client.connect();

    const sql = json2query({
        mode : 'INSERT',
        tableName : 'recipe',      
        column : ['recipe_srno', 'title', 'register_datetime', 'register_id', 'description', 'min','serving'],
        value : ["nextval('sq_recipe_srno')", '$1', "to_char(now(), 'yyyymmddhh24miss')", '$2', '$3', '$4', '$5']
    })
    const values = [req.body.title, req.body.user_id, req.body.description, req.body.min, req.body.serving];

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
        mode : 'INSERT-SELECT',
        tableName : 'recipe_step',  
        column : ['recipe_step_srno', 'recipe_srno', 'title', 'description', 'url', 'sequence','title_url_yn'],
        value : ["nextval('sq_recipe_step_srno')", "$1", "dummy.title", "dummy.description", "dummy.url","(ROW_NUMBER() OVER()) as row_num","dummy.title_url_yn"],
        dummy : dummy1,
        where : ["and dummy.title != ''"]
    })

    let values2 = [];   
    let dummy2 = "";
    req.body.grocerys.forEach(function(item, i){
        dummy2 += `\n select $${2*i+2}::numeric as srno, $${2*i+3}::numeric as amount union`;
        values2.push(item.srno);
        values2.push(item.amount);
    });   
    dummy2 += `\n select -1 as srno, -1 as amount`;

    const sql2 = json2query({
        mode : 'INSERT-SELECT',
        tableName : 'recipe_link_grocery',  
        column : ['recipe_srno', 'grocery_srno', 'grocery_amount'],
        value : ["$1", "dummy.srno", "dummy.amount"],
        dummy : dummy2,
        where : ["and dummy.srno != -1"]
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
            values2 = [qres.rows[0].recipe_srno, ...values2];
            client.query(sql2, values2, (err2, qres2) => {
                if(err2){
                    console.log(sql2);
                    console.log(values2);
                    console.log(err2);
                    client.end();
                    return;
                } 
                client.end();
                var qresTotal  = {first:qres,second:qres1,third:qres2}
                res.status(200).json({success:true, qresTotal});
            });
        });
    });

});

router.post('/addCart', (req, res) => {

    const client = new Client(config.postgresqlInfo);
    client.connect();

    const sql1 = json2query({
        mode : 'INSERT', 
        tableName : 'user_link_recipe', 
        column : [
            'user_id', 
            'recipe_srno', 
            'recipe_amount', 
            'finish_datetime'
        ],         
        value : [
            "$1", "$2", "$3", 
            "''"],
        where : [
            ""
        ]
    })
    const values1 = [req.body.user_id, req.body.recipe_srno, req.body.recipe_amount];

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

module.exports = router; 