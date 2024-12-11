require('dotenv').config()
const express = require('express');
const connectToDB = require("./database/db");
const bookRoutes = require("./routes/book-routes");

const app = express();
const PORT = process.env.PORT || 3000;


//connect to our database
connectToDB();

//middleware -> express.json()
//This is a crucial middleware function in Express.js that:
//Parses incoming requests with JSON payloads
//Makes the parsed data available in req.body

//Key Points :
// * Without this middleware, you cannot read JSON data sent in the request body
// * It's essential for POST/PUT requests where you send JSON data
// * It automatically converts JSON strings to JavaScript objects
// * It should be added before any routes that need to handle JSON data
// * This is why it's placed before your routes in the server.js file, ensuring all routes can handle JSON payloads.


app.use(express.json());

//routes here
//->/api/books is the parent path
app.use("/api/books",bookRoutes);

app.listen(PORT,()=>{
    console.log(`Server is now running on port ${PORT}`);
});