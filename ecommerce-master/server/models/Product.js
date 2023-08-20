const mongoose = require('mongoose');
const product = mongoose.Schema({
        title : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        image : {
            type : String,
            required : true
        },
})
const Product = mongoose.model("product",product);
module.exports = Product;