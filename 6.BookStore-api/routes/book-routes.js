const express = require('express');
const {getAllBooks,getSingleBookByID,addNewBook,updateBook,deleteBook} = require('../controllers/book-controllers')

//create express router
const router = express.Router();

//all routes that are related to books only

router.get('/get',getAllBooks);
router.get('/get/:id',getSingleBookByID);
router.post('/add',addNewBook);
router.put('/update/:id',updateBook);
router.delete('/delete/:id',deleteBook);

module.exports = router;