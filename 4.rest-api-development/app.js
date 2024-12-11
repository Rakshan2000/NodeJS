const express = require('express');
const app = express();

//Middleware

app.use(express.json())

let books = [
    {
        id : '1',
        title : 'Book 1'
    },
    {
        id : '2',
        title : 'Book 2'
    },
    {
        id : '3',
        title : 'Book 3'
    }
];


//get all books

app.get("/",(req,res)=>{
    res.json({
        message: "Welcome to our Bookstore API"
    });
});

//get all books
app.get('/get',(req,res)=>{
    res.json(books);
});

//get a single book
app.get('/get/:id',(req,res)=>{
    const book = books.find(item=>item.id == parseInt(req.params.id));

    if(book){
        res.status(200).json(book);
    }else{
        res.status(404).json({
            message: "Book not found! Please try with a different Book ID"
        })
    }
})

//add a new book
app.post('/add', (req,res)=>{
    const newBook = {
        id : (Math.floor(Math.random() * 1000)).toString(),
        title : `Book ${Math.floor(Math.random() * 1000)}`
    }

    books.push(newBook);
    res.status(200).json({
        data : newBook,
        message : 'New Book is added Successfully'
    });
});


//Update a Book
app.put('/update/:id',(req,res)=>{
    const findCurrentBook = books.find(book=>book.id === req.params.id);
    if(findCurrentBook){
        findCurrentBook.title = req.body.title || findCurrentBook.title;   
        //|| Operator: This is a logical OR operator. It checks the value on the left (req.body.title) 
        //and if it is truthy (i.e., not undefined, null, 0, false, or an empty string), 
        //it will use that value. If it is falsy, it will fall back to the value on the right (findCurrentBook.title).

        res.status(200).json({
            message : `Book with ID ${req.params.id} updated successfully`,
            data : findCurrentBook
        });
    }
    else{
        res.status(404).json({
            message: 'Book Not Found'
        });
    }
});

app.delete('/delete/:id',(req,res)=>{
const findIndexOfCurrentBook = books.findIndex(book=>book.id === req.params.id);
if(findIndexOfCurrentBook !== -1){
    const deletedBook = books.splice(findIndexOfCurrentBook,1);
    res.status(200).json({
        message: "Book Deleted Successfully",
        data: deletedBook[0],
    });
} else{
    res.status(404).json({
        message: 'Book Not Found'
    });
}
});
const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
});



