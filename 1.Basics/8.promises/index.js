const { rejects } = require("assert");
const { resolve } = require("path");

function delayFn(time){
    return new Promise((resolve) => setTimeout(resolve, time));
}

console.log("Promise Lecture Starts");
delayFn(10000).then(()=>console.log("after 10 seconds promise resolved"));
console.log("end");

function divideFn(num1,num2){
    return new Promise((resolve,reject)=> {
        if(num2===0){
            reject('Can not perform division by 0')
        } else{
            resolve(num1/num2)
        }
    });
}

divideFn(2,0)
.then((result)=> console.log(result))
.catch((error)=>console.log(error,"err"))


const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
  console.log(fetchPromise);
  
  fetchPromise.then((response) => {
    console.log(`Received response: ${response.status}`);
  });
  
  console.log("Started request…");
  
//fetchPromise.then((response) => {
//const jsonPromise = response.json();
//  jsonPromise.then((data) => {
//      console.log(data[0].name);
//      });
//    });

  fetchPromise
  .then((response) => response.json())
  .then((data) => {
    console.log(data[0].name);
  });


