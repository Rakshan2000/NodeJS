const express = require('express');
const {insertSampleProducts,getProductStats,getProductAnalysis} = require('../controllers/product-controller');

const router = express.Router();

router.post('/add',insertSampleProducts)
router.get('/getStatus',getProductStats)
router.get('/getAnalysis',getProductAnalysis)

module.exports = router;