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
    const tmpColumns = dataJson.column && dataJson.column.join(',\n');
    const tmpValues = dataJson.value && dataJson.value.join(',\n');
    const tmpWheres = dataJson.where && dataJson.where.join(' \n');
    let tmpColumnAndValues = "";
    if(dataJson.column && dataJson.value && dataJson.column.length == dataJson.value.length){
        dataJson.column.forEach(function(v,i){
            tmpColumnAndValues += '\n' + dataJson.column[i] + ' = ' + dataJson.value[i];
            tmpColumnAndValues += ((dataJson.column.length-1 == i) ? '' : ',');
        })
    } else {
        //pass
    }

    if("INSERT" === dataJson.mode ){
        tmpQuery = `INSERT INTO ${tmpTableName} \n(${tmpColumns}) \nVALUES (${tmpValues}) \nRETURNING *;`;
    } else if ( "INSERT-SELECT" === dataJson.mode ){
        tmpQuery = `INSERT INTO ${tmpTableName} \n(${tmpColumns}) \nSELECT ${tmpValues} \nFROM (${dataJson.dummy}) dummy \nWHERE 1=1 ${tmpWheres} \nRETURNING *;`;
    } else if ( "SELECT" === dataJson.mode ){
        tmpQuery = `SELECT ${tmpColumns} \nFROM ${tmpTableName} \nWHERE 1=1 ${tmpWheres};`;
    } else if ( "SUBQUERY" === dataJson.mode ){
        tmpQuery = `(SELECT ${tmpColumns} \nFROM ${tmpTableName} \nWHERE 1=1 ${tmpWheres})`;
    } else if ( "UPDATE" === dataJson.mode ){
        tmpQuery = `UPDATE ${tmpTableName} \nSET ${tmpColumnAndValues} \nWHERE 1=1 ${tmpWheres}`;
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

router.post('/addRecipeInCart', (req, res) => {

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

router.post('/getCartList', (req, res) => {

    const client = new Client(config.postgresqlInfo);
    client.connect();

    const ulrDynamic = json2query({
        mode : 'SUBQUERY', 
        tableName : 'user_link_recipe', 
        column:["recipe_srno", "sum(recipe_amount)"], 
        where : ["and user_id = $1","group by recipe_srno"]
    });
    const sql1 = json2query({
        mode : 'SELECT', 
        tableName : ulrDynamic + ' as ulr left outer join recipe r on r.recipe_srno = ulr.recipe_srno', 
        column : [
            'r.recipe_srno', 
            'r.title', 
            'ulr.sum as total_amount', 
            'round(ulr.sum/coalesce(r.serving,2),2) as multiple'
        ],         
        where : [""]
    })
    const values1 = [req.body.user_id];
    client.query(sql1, values1, (err1, qres1) => {
        qres1.query = sql1;
        if(err1){
            console.log(sql1);
            console.log(values1);
            console.log(err1);
            client.end();
            return;
        } 
        const values2 = [];
        let dummy2 = "";
        qres1.rows.forEach(function(item, i){
            dummy2 += `\n select $${2*i+1}::numeric as recipe_srno, $${2*i+2}::numeric as multiple union`;
            values2.push(item.recipe_srno);
            values2.push(item.multiple);
        });   
        dummy2 += `\n select -1 recipe_srno, -1 multiple`;

        const rsltDynamic = json2query({
            mode : 'SUBQUERY', 
            tableName : '('+dummy2+') dummy left outer join recipe_link_grocery rlg on rlg.recipe_srno = dummy.recipe_srno', 
            column:["rlg.grocery_srno", "sum(rlg.grocery_amount * dummy.multiple)"], 
            where : ["and coalesce(rlg.grocery_srno,-1) != -1", "group by rlg.grocery_srno"]
        });

        const sql2 = json2query({
            mode : 'SELECT', 
            tableName : rsltDynamic + ' as rslt left outer join grocery g on rslt.grocery_srno = g.grocery_srno', 
            column : [
                'g.grocery_srno', 
                'g.grocery_name', 
                'g.grocery_unit_name', 
                'g.grocery_unit_per_gram',
                'round(rslt.sum,0) sum'
            ],         
            where : ["and coalesce(g.grocery_srno,-1) != -1"]
        })
        client.query(sql2, values2, (err2, qres2) => {
            if(err2){
                console.log(sql2);
                console.log(values2);
                console.log(err2);
                client.end();
                return;
            } 
            client.end();
            var qresTotal  = {first:qres1,second:qres2}
            res.status(200).json({success:true, qresTotal});
        });
    });
});

router.post('/updateRecipeInCart', (req, res) => {

    const client = new Client(config.postgresqlInfo);
    client.connect();

    const sql1 = json2query({
        mode : 'UPDATE', 
        tableName : 'user_link_recipe', 
        column : ['recipe_amount'],         
        value : ["$1"],
        where : ["and recipe_srno = $2","and user_id = $3"]
    })
    const values1 = [req.body.total_amount, req.body.recipe_srno, req.body.user_id];

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