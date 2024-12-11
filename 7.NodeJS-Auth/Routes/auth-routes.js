const express = require('express');
const router = express.Router();
const {registerUser,loginUser,changePassword,forgotPassword,verifyOTP} = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');
//Assign the controllers for a paticular routes


//all routes are related to authentication & Authoraization
router.post('/register',registerUser);
router.post('/register/verify-otp',verifyOTP);
router.post('/login',loginUser);
router.post('/login/changepassword',authMiddleware,changePassword);
router.post('/login/forgotpassword',authMiddleware,forgotPassword);

module.exports = router;