const mongoose = require('mongoose');

const connectToDB = async()=>{

    try{

        await mongoose.connect('mongodb+srv://ckrakshan11:ckrakshan12@cluster0.qowxt.mongodb.net/');
        console.log('mongodb is connected successfully');

    }catch(e){
        console.error('Mongodb connection failed',error);
        process.exit(1);
    }
};


module.exports = connectToDB;