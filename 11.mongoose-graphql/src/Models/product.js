const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    isStock: {
        type : Boolean,
        required: false
    }
});

module.exports = mongoose.model('Product',ProductSchema);