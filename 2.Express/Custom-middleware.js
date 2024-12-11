const express = require('express');
const app = express();

const requestTimestampLogger = (req,res,next) => {
    const timestamp = new Date().toISOString();

    console.log(`${timestamp} from ${req.method} to ${req.url}`);
    next();
};

app.use(requestTimestampLogger);

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