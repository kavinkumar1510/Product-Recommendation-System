const mongoose = require('mongoose');
const coupon = mongoose.Schema({
        title : {
            type : String,
            required : true
        },
        offer : {
            type : Number,
            required : true
        },
        code : {
            type : String,
            required : true
        },
        expirationdate : {
            type : Date,
            required : true
        }
})
const Coupon = mongoose.model("coupon",coupon);
module.exports = Coupon;