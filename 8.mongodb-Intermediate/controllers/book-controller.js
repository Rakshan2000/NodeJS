const Author = require('../models/Author');
const Book = require('../models/Book');

const createAuthor = async(req,res)=> {
    try{

        const author = new Author(req.body);
        await author.save();

        res.status(200).json({
            success: true,
            message: author
        });

    }catch(error){

        console.log();
        res.status(400).json({
            success: false,
            message: 'error occured'
        });

    }
}

const createBook = async(req,res)=> {
    try{
        const book = new Book(req.body);
        await book.save();

        res.status(200).json({
            success: true,
            message: book
        });
    }catch(error){

        console.log();
        res.status(400).json({
            success: false,
            message: 'error occured'
        });

    }
}

const getBookWithAuthor = async(req,res)=>{

    try{
        const book = await Book.findById(req.params.id).populate('author');

        if(!book){
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book found',
            data: book
        });
    }
    catch(error){
        console.log();
        res.status(400).json({
            success: false,
            message: 'error occured'
        });
    }
}

module.exports = {createAuthor,createBook,getBookWithAuthor}