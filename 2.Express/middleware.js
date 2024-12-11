const express = require('express');
const app = express();

//Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

//Middleware functions can perform the following tasks:

//Execute any code.
//Make changes to the request and the response objects.
//End the request-response cycle.
//Call the next middleware function in the stack.

const myFirstMiddleware = (req,res,next) =>{
    console.log("this first middleware will run on every request");

    next();

};

app.use(myFirstMiddleware);

app.get('/',(req,res)=>{  
    res.send("Home Page");
});

app.get('/About',(req,res)=>{
    res.send("About Page")
})


const port = 3000;

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});