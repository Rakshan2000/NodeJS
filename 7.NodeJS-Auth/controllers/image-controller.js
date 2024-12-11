const Image = require('../models/Image');
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');;






const uploadImageController = async(req,res)=>{
    try{
        //Check if file is missing in req object
        if(!req.files || req.files.length === 0){
            return res.status(400).json({
                success : false,
                message : 'File is required. Please upload an image'
            })
        }

        const uploadImages = [];

        //Upload to cloudinary : Single Image
        //const {url, publicId} = await uploadToCloudinary(req.file.path);

        //Upload Multiple files to cloudinary
        for(const file of req.files){
            const {url, publicId} = await uploadToCloudinary(file.path);

            const newlyUploadedImage = new Image({
                url,
                publicId,
                uploadedBy : req.userInfo.userId,
            });

            await newlyUploadedImage.save(); // Only this line suffcient for Single Upload
            uploadImages.push(newlyUploadedImage);
    
            fs.unlinkSync(file.path);
    
        }

        //store the image url and public id along with the uploaded user Id  into the database : Single Image
        //const newlyUploadedImage = new Image({
        //     url,
        //     publicId,
        //     uploadedBy : req.userInfo.userId
        // });

        // Only this line suffcient for Single Upload
        //await newlyUploadedImage.save(); 
        //Clean up local file
        //fs.unlinkSync(req.file.path);

        res.status(201).json({
            success : true,
            message : 'Imaged uploaded',
            image : uploadImages
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong! Please try again'
        })
    }
}

const getImageController = async(req,res)=>{
    try{

        const fetchImage = await Image.find({});
        if(!fetchImage){
            res.status(400).json({
                success : false,
                message : 'No image found in the base'
            });
        }else{
            res.status(200).json({
                success : true,
                message : 'Image Collection found',
                data: fetchImage
            });
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong! Please try again'
        })
    }
}

const deleteImageController = async(req,res)=> {

    try{

        const getCurrentIdOfImageToBeDeleted = req.params.id;
        console.log(getCurrentIdOfImageToBeDeleted);

        const userId = req.userInfo.userId;
        console.log(userId);

        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);


        //console.log(image.uploadedBy.toString());

       //const image = await Image.findOne({ publicId: req.params.id });

        if(!image){
            return res.status(404).json({
                success : false,
                message : 'Image not found'
            });
        }

        //check if this image i uploaded by the current user who is trying to delete the image

        if(image.uploadedBy.toString() !== userId){
            return res.status(403).json({
                success : false,
                message : 'You are not authorized to delete this image'
            });
        }

        //delete this image first from your coludinary storage
        await cloudinary.uploader.destroy(image.publicId);

        //delete this image from mongodb database
        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);

        res.status(200).json({
            success : true,
            message : "Image delete successfully"
        });

        
    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong! Please try again'
        })
    }
}

const fetchImageController = async(req,res)=>{
    
    try{

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page-1) * limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
        //This is used in MongoDB where:
        // 1 means ascending order (A to Z, 1 to 9)
        // -1 means descending order (Z to A, 9 to 1)

        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages/limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);


        if(images){

            res.status(200).json({
                success :true,
                currentPage: page,
                totalPages: totalPages,
                totalImages : totalImages,
                data : images,
            });
        }


    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong! Please try again'
        })
    }
}

const deleteAllImagesController = async(req,res) =>{
    try{
        
        const images = await Image.find({});

        if(images.length === 0){
            return res.status(404).json({
                success: false,
                message: 'No images found in database'
            });
        }

        //Delete all images from cloudinary
        for (const image of images) {
            await cloudinary.uploader.destroy(image.publicId);
        }

        //Delete all images from MongoDB
        await Image.deleteMany({});

        res.status(200).json({
            success : true,
            message : `Successfully deleted ${images.length} images`
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong! Please try again'
        })
    }
}

module.exports = {
    uploadImageController,
    getImageController,
    deleteImageController,
    fetchImageController,
    deleteAllImagesController
};