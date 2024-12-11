//1. This needs to be created in Models 
//2. Schema's will be created i Models folder

const mongoose = require('mongoose');
//get Mongoose capabilites

const otpSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email : {
        type : String,
        required : false,
        unique : true,
        trim : true,
        lowercase : true
    },
    phone : {
        type : String,
        required : true,
        trim : true
    },
    password :{
        type :String,
        required : true
    },
    otp :{
        type : otpSchema,
        required: false
    },
    role :{
        type : String,
        enum : ['user','admin'], //only allow 'user' or 'admin' roles
        default : 'user'
    },
    isPhoneVerified: {
        type : Boolean,
        default: false
    }
},{timestamps : true});

module.exports = mongoose.model('User',UserSchema);

// //First argument 'User': The name of the collection in MongoDB (will be automatically pluralized to 'users')
// Second argument UserSchema: The schema definition that defines the structure of documents in this collection
// Returns a Mongoose Model class that you can use to create, read, update, and delete documents