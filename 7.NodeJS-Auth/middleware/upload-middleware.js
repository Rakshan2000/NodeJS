const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create absolute path for uploads directory
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

//set our multer storage

const Storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,uploadDir)
    },
    filename : function(req,file,cb){
        cb(null,

            file.fieldname + "-" +Date.now() + path.extname(file.originalname)

        )
    }
});


//file filter fuction
const checkFileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new Error('Not an Image! Please upload only images'))
    }

}

// Create multer instance with configuration
const upload = multer({
    storage : Storage,
    limits : {
        fileSize : 5 * 1024 * 1024,
        files : process.env.DEFAULT_UPLOAD_LIMIT
    },
    fileFilter : checkFileFilter
});

// const dynamicUpload = (req,res,next)=> {
//     // Get limit from query params, headers, or environment variables
//     const limit = parseInt(req.query.limit) || process.env.DEFAULT_UPLOAD_LIMIT || 5;
    
//     // Apply the multer middleware with dynamic limit
//     upload.array('image', limit)(req, res, function(err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Upload error: ${err.message}`
//             });
//         } else if (err) {
//             return res.status(400).json({
//                 success: false,
//                 message: err.message
//             });
//         }
//         next();
//     });

// }

//multer middleware
module.exports = {
    uploadMiddleware: upload.array('image', process.env.DEFAULT_UPLOAD_LIMIT)
};

 