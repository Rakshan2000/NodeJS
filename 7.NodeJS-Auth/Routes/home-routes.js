const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

router.get('/welcome',authMiddleware,(req,res)=>{

    const {username,userId} = req.userInfo;
    res.json({
        message : 'welcome to the Home Page',
        User: {
            _id : userId,
            Name : username
        }
    });
});

module.exports = router;