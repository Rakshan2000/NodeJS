const fs = require('fs');
const { domainToASCII } = require('url');

fs.readFile('input.txt','utf8',(err,data)=>{
    if(err){
        console.log("Error Occured",err);
        return;
    }
    
    console.log(data);

    const modifiedData = data.toUpperCase();

    fs.writeFile('output.txt',modifiedData,(err)=>{
        if(err){
            console.log('Error Writing file',err);
            return;
        }
        console.log('Data writen to the new file');

    fs.readFile('output.txt','utf8',(err,data)=>{
        if(err){
            console.log('Error Reading File',err);
            return;
        }
        console.log(data);
    })
        
    });
})