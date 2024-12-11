const express = require('express');

const app = express();

//application level settings
app.set('view engine','ejs');

//routing
app.get('/',(res,req)=>{
    res.send('Home Page');
});

app.post('/api/data',(res,req)=>{
    res.json({
        message:'Data Received',
        data : req.body
    })
})

app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send('somethig went wrong')
})

const port = 3000;

app.listen(port,()=>{
    console.log(`server is now running at port ${post}`);
});