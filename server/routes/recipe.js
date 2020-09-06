const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

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

router.post('/uploadImage', (req, res) => {
    upload(req, res, err => {
        if(err){
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })
});

module.exports = router; 