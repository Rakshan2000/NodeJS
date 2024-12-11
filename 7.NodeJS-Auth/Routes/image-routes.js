const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const {uploadMiddleware} = require('../middleware/upload-middleware');
const {uploadImageController,getImageController,deleteImageController,fetchImageController,deleteAllImagesController} = require('../controllers/image-controller')

const router = express.Router();

router.post('/upload',authMiddleware,adminMiddleware,uploadMiddleware,uploadImageController);

router.get('/download',authMiddleware,getImageController);

router.delete('/delete/:id',authMiddleware,adminMiddleware,deleteImageController);

router.get('/fetch',authMiddleware,fetchImageController);

router.delete('/deleteall',authMiddleware,adminMiddleware,deleteAllImagesController);

module.exports= router;
