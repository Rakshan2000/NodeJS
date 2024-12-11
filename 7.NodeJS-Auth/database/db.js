require('dotenv').config()
// 1. This will help to retrive the Dot Env file
// 2. Create env file with necessory details in it (Port Number and Mongo URL) 
 
const mongoose = require('mongoose');
// This will help us to get all the capabilites from Mongo DB

const connectToDB = async()=>{

//Async fuction (Allows se of await inside)

    try{

        await mongoose.connect(process.env.MONGO_URL);
        // await - The await keyword is used in JavaScript to pause the execution of an async function until a Promise is settled (either resolved or rejected).
        // It can only be used inside functions declared with the async keyword.
        console.log('mongodb is connected successfully');

    }catch(e){
        console.error('Mongodb connection failed',error);
        process.exit(1);
        //process.exit(): This is a method provided by Node.js to exit the current process. It takes an optional exit code as an argument.
        //* Exit Code 1: In this context, 1 is used as the exit code, which conventionally indicates that the process is exiting due to an error. 
        //* An exit code of 0 typically indicates a successful termination, while any non-zero value indicates an error.
    }
}

module.exports = connectToDB;
//module.exports:
//* This is Node.js's export mechanism
//* It's an object that defines what a module exports
//* Whatever you assign to module.exports becomes available to other files that import this module

// Key points:
// * async: Makes the function asynchronous, meaning it returns a Promise and can use await
// * Arrow function syntax (=>) is a modern JavaScript way to define functions
// * The function uses a try-catch block for error handling
// * It uses mongoose.connect() to establish the database connection
// * The MongoDB connection URL is stored in an environment variable (MONGO_URL)