const User = require('../models/User');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const {client,twilioPhoneNumber} = require('../config/twilio');
const {generateOTP, isOTPValid} = require('../helpers/otpHelper');


//register controller
const registerUser = async(req,res)=>{

    try{
        //extract user information from our request body
        const {username,email,phone,password,role} = req.body;

        //check if the user is already exists in our database
        const checkExistingUser = await User.findOne({$or :[{username}]});
        if(checkExistingUser){
            return res.status(400).json({
                success : false,
                message : 'User is already exists either with same username or email'
            });
        }

        // Validate phone number format
        const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;

        // Generate OTP
        const otpCode = generateOTP();
        const otpExpiryTime = new Date(Date.now() + 10 * 60 * 1000);

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            username,
            email,
            phone: formattedPhone,
            password: hashedPassword,
            otp: {
                code: otpCode,
                expiresAt: otpExpiryTime
            },
            isPhoneVerified: false,
            role : role || 'user'
        });

        try {
            // Attempt to send SMS
            await client.messages.create({
                body: `Your verification code is: ${otpCode}. Valid for 10 minutes.`,
                from: twilioPhoneNumber,
                to: formattedPhone
            });
        } catch (twilioError) {
            console.log('Twilio SMS Error:', twilioError);
            
            // For development/testing: Still save user but return OTP in response
            await newUser.save();
            
            return res.status(200).json({
                success: true,
                message: 'User registered successfully. SMS delivery failed.',
                userId: newUser._id,
                developmentOTP: process.env.NODE_ENV === 'development' ? otpCode : undefined
            });
        }

        // If SMS sent successfully, save user
        await newUser.save();

        // if(newlyCreatedUser){
        //     res.status(201).json({
        //         success : true,
        //         message : 'User registered successfully'
        //     });
        // }else{
        //     return res.status(400).json({
        //         success : false,
        //         message : 'Unable to register user!  please try again'
        //     });
        // }
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully. Please verify your phone number.',
            userId: newUser._id
        });


    }catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
        });
    }
}
//step 2: Verify OTP and complete registration
const verifyOTP = async (req,res) => {
    try{

        const {userId, otp} = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Verify OTP
        if (!isOTPValid(user.otp.code, user.otp.expiresAt)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        if (user.otp.code !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        user.isPhoneVerified = true;
        user.otp = undefined; // Clear OTP after successful verification
        await user.save();

        try{
            await User.deleteMany({ isPhoneVerified: false });
        }catch (error) {
        console.error('OTP verification error:', error);
        };
        
        res.status(200).json({
            success: true,
            message: 'Phone number verified successfully'
        });

    }catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Verification failed. Please try again.'
        });
    }
}

//login controller

const loginUser = async(req,res)=>{
    try{

        const {username,password} = req.body;

        const user = await User.findOne({username});

        if(!user){
            res.status(400).json({
                success : false,
                message : "Invalid Username / User not Found : Please Try again"
            });
        }
        else
        {

            const isPasswordMatch = await bcrypt.compare(password,user.password);

                if(!isPasswordMatch){
                    res.status(400).json({
                    success : false,
                    message : "Invalid Password! Please Try again"
                });
        }
        else
        {
             //create user token
            const accessToken = jwt.sign(
                {
                userId : user._id,
                username : user.username,
                role : user.role
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn : '15m'
                });

            res.status(200).json({
                success : true,
                message : 'Logged in successful',
                accessToken
            });
        }
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            sucess : false,
            message :'Some error occured! please try again'
        });
    }
}

//Change password

const changePassword = async(req,res) =>{
    try{

        const userId = req.userInfo.userId;

        const {oldPassword, newPassword} = req.body;

        const findUser = await User.findById(userId);

        if(!findUser){
            res.status(400).json({
                success : false,
                message : "Invalid Username / User not Found : Please register"
            });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword,findUser.password);

        if(!isPasswordMatch){
            res.status(401).json({
                success: false,
                message: "Entered password does not match! Please try again"
            });
        }

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        findUser.password = hashedPassword;

        await findUser.save();

        const Username = findUser.username;

        res.status(200).json({
            status : true,
            message : `Password Changed successfully ${Username}`
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            sucess : false,
            message :'Some error occured! please try again'
        });
    }
}

//forgot password

const forgotPassword = async(req,res) => {
    
    const {username,newPassword} = req.body;

    const findUser = await User.findOne({username});

    if(!findUser){
        res.status(400).json({
            success : false,
            message : "User Id invalid / User does not exists"
        });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword,salt);

    findUser.password = hashedPassword;

    await findUser.save();

    res.status(200).json({
        status : true,
        message : `Password Changes successfully for ${findUser.username}` 
    });
}

module.exports = {registerUser,verifyOTP,loginUser,changePassword,forgotPassword};