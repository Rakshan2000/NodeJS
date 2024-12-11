//module.exports -> Export
//require -> Import

const firstModule = require('./first-module');

console.log(firstModule.add(3,1));

try{

    console.log('try to divide by zero');
    let result = firstModule.divide(0,10)
    console.log(result);
    
    
}catch(error){
    console.log('caught an error', error.message)
}


//module wrapper
(
    function(exports, require, module, __filename, __dirname){
        //your module code
        
    }
)