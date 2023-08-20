const moongoose = require("mongoose");
const user = moongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required : true,
    }
})
const UserData = moongoose.model("users",user);
module.exports = UserData;