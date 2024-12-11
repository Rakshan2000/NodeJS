const http = require('http');

const server = http.createServer((req,res)=>{

   // console.log(req,'req');
    const url = req.url;
    console.log(url);
    
    if (url==='/'){
    res.writeHead(200,{'content-Type' : 'text/plain'});
    res.end('Home Page');
    }
    else if(url==='/projects'){
        res.writeHead(200,{'content-Type' : 'text/plain'});
        res.end('Project Page');
    }else{
        res.writeHead(404,{'content-Type' : 'text/plain'});
        res.end('This page cannot be found');
    }
    
});

const port = 3000;
server.listen(port, ()=>{
    console.log(`server is now listening now on port ${port}`);
})