require('dotenv').config() 
// 1. This will help to retrive the Dot Env file
// 2. Create env file with necessory details in it (Port Number and Mongo URL) 

const connectToDB = require('./database/db'); 
// 1. Create a Database folder 
// 2. Create a db.js file

const express = require('express');
const app = express();
//1. get express capabilites to express
//2. assign the capabiltes to app

const authRoutes = require('./Routes/auth-routes');
const homeRoutes = require('./Routes/home-routes');
const adminRoutes = require('./Routes/admin-routes');
const imageRoutes = require('./Routes/image-routes');
//Routes
//After middle-ware excution - the Routes will get executed
//-[/api/auth]-authRoutes[ex: /register or /login]
//Inside routes - controllers will perform functionalities like register/Login

const PORT = process.env.PORT || 3000;
//Assign port in which the server should run



//Connect to database
connectToDB();

//Middleware -> express.json()
app.use(express.json());
//* Global Middleware:
//- This middleware parses incoming JSON requests and makes the parsed data available in req.body.
//- It is applied to all incoming requests.
//app.use() is used to mount middleware functions at a specified path. 
//If no path is specified, the middleware is executed for every request to the app.

app.use('/api/auth',authRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/image',imageRoutes);
//Route-Specific Middleware:
// app.use([path,] callback [, callback...])
//- This applies the authRoutes middleware only to requests that start with /api/auth.
//authRoutes is typically a router that handles authentication-related routes.


//Make sure that the localhost:3000 is listenig/rendering the data into the system
app.listen(PORT, ()=>{
    console.log(`Server is now running on port ${PORT}`)
});

