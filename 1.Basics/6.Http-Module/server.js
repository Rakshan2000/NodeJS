const http = require('http');

const server = http.createServer((req,res)=>{

    console.log(req,'req');
    res.writeHead(200,{'content-Type' : 'text/plain'});
    res.end('Hello Node js from http module');
    
});

const port = 3000;
server.listen(port, ()=>{
    console.log(`server is now listening now on port ${port}`);
})