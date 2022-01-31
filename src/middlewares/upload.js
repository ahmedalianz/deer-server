const multer=require('multer')
const fs=require('fs')
const path=require('path')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        let location;
        if(!req.user) location="uploads"
        else location=path.join("uploads" , req.user._id.toString())
        fs.mkdir(location,err => {console.log(err)})
        cb(null,location)
    },  
    filename:function(req,file,cb){
        let name=file.fieldname + '_' + Date.now() + path.extname(file.originalname)
        cb(null,name)
    }
})
const upload =multer({
    storage,
    limits:{fileSize:2000000},
    fileFilter:function(req,file,cb){
        cb(null,true)
    }
})
module.exports =upload