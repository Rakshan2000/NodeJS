require('dotenv').config()

const mongoose = require('mongoose');

const connectToDB = async() => {
    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongodb is connected successfully');
        
        
    }catch(error){
        console.error('Mongodb connection failed',error);
        process.exit(1);
    }
}

module.exports = connectToDB;