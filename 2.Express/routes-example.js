const express = require('express');
const app = express();

//root route

app.get('/',(req,res)=>{
    res.send("Welcome to our Home Page");
});

//get all products
app.get('/products',(req,res)=>{
    const products = [
        {
            id : 1,
            label : 'Product 1'
        },
        {
            id : 2,
            label : 'Product 2'
        },
        {
            id : 3,
            label : 'Product 3'
        }
    ]

    res.json(products);
})


//get a single product
app.get('/products/:id',(req,res)=>{
console.log("req.params",req.params);

    const productId = parseInt(req.params.id);
    const products = [
        {
            id : 1,
            label : 'Product 1'
        },
        {
            id : 2,
            label : 'Product 2'
        },
        {
            id : 3,
            label : 'Product 3'
        }
    ]

    const singleProduct = products.find(product => product.id == productId);

//product => product.id == productId
//this function takes product from the products, later product.id takes the id from each JSON and compares with productID 

    if(singleProduct){
        res.json(singleProduct);
    }else{
        res.status(404).send("Product is not Found! Please try with different Id");
    }
})

const port = 3000;

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);  
})

