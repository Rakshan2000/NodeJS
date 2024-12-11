const Book = require("../models/book");

const getAllBooks = async(req,res)=>{
    try{
        const allBooks = await Book.find({});
        if(allBooks?.length>0){
            res.status(200).json({
                success : true,
                message : 'List of books fetched successfully',
                data : allBooks
            });
        }else{
            res.status(404).json({
                success: false,
                message : 'No Books found in collection'
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message:'Something went wrong! Please try again'
        });
        
    }
 
}

const getSingleBookByID = async(req,res)=>{

    try{
        const getCurrentBookID = req.params.id;
        const bookDetailsByID = await Book.findById(getCurrentBookID);

        if(!bookDetailsByID){
            return res.status(404).json({
                succuss : false,
                message : 'Book with the current ID is not found! Please try with different ID'
            });
        }else{
            res.status(200).json({
                success : true,
                data : bookDetailsByID
            });
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message:'Something went wrong! Please try again'
        });
    }  
    
}

const addNewBook = async(req,res)=>{
    try{

        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData);
        if(newBookFormData){
            res.status(201).json({
                success : true,
                message : 'Book added successfully',
                data : newlyCreatedBook
            });
        }

    }catch(e){
            console.log(e);
            res.status(500).json({
                success : false,
                message:'Something went wrong! Please try again'
            });
    }
    
}

const updateBook = async(req,res)=>{

    try{
        const getCurrentBookId = req.params.id;
        //const getBodyToBeUpdated = req.body;
        const UpdateCurrentBook = await Book.findByIdAndUpdate(
            getCurrentBookId,
            {
                title: req.body.title
            },
            {
                new : true
            });

        if(!UpdateCurrentBook){

            return res.status(404).json({
                succuss : false,
                message : 'Book with the current ID is not found! Please try with different ID'
            });

        }else{
            res.status(201).json({
                success : true,
                message : 'Book Updated Successfully',
                data : UpdateCurrentBook
            });
    }
}
catch(e){
        console.log(e);
            res.status(500).json({
                success : false,
                message:'Something went wrong! Please try again'
            });
    }
    
}

const deleteBook = async(req,res)=>{
    const getCurrentBookID = req.params.id;
    const deleteBook = await Book.findByIdAndDelete(getCurrentBookID);
    const allBooks = await Book.find({});

    if(!deleteBook){
        res.status(404).json({
            Success : false,
            message : "Book To be deleted Not Found"
        });
    }else{

        res.status(201).json({

            Deleted:{
                success : true,
                message : "Deleted Book",
                data: deleteBook,
            },
            AllBooks :{
                success : true,
                message : 'List of books fetched successfully',
                data : allBooks
            }
            
        });
    }
}

module.exports = {getAllBooks,getSingleBookByID,addNewBook,updateBook,deleteBook}; 