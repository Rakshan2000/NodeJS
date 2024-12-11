const fs = require('fs');
const path = require("path");


const dataFolder = path.join(__dirname,"data");


if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder);
    console.log("data folder created");
}

const filePath = path.join(dataFolder,'example.txt');
//sync way of creating the file

fs.writeFileSync(filePath,'Hello from Node js');
console.log("File created successfully");

const readConstFromFile = fs.readFileSync(filePath,"utf8");
console.log("File Content:", readConstFromFile);

fs.appendFileSync(filePath,"\nThis is the next line");
console.log("new file content added");

//async way of creating the file

