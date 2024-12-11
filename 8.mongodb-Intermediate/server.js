require('dotenv').config()

const connectToDB = require('./Database/db');
const express = require('express');
const productRoutes = require('./routes/product-routes'); 
const bookRoutes = require('./routes/book-routes');
const app = express();

const PORT = process.env.PORT || 3000;

connectToDB();

app.use(express.json());

app.use('/products',productRoutes);
app.use('/reference',bookRoutes);

app.listen(PORT,()=>{
    console.log(`Server is now running on port ${PORT}`);
})