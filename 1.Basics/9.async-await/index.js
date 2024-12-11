const { error } = require("console");

function delayfn(time){

    return new Promise((resolve)=>setTimeout(resolve,time));
}

async function delayedGreet(name) {
    await delayfn(5000);
    console.log(name);
}

delayedGreet('Rakshan C K');


async function division(num1,num2) {
    try{

        if(num2===0) throw new Error("Can not divide by 0");
        return num1/num2;

    }catch(err){
        console.error("error",error);
        return null;
    }
}

async function mainFn() {
    console.log(await division(10,2));
    console.log(await division(10,0));
}

mainFn();


