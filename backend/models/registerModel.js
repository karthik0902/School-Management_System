const mongoose=require("../config/mongoose")
const userSchema =new mongoose.Schema({
    UserName: String,
    password: String, 
    School_code:String,
   
   
 });
 const registerModel =mongoose.model("StudentUsers",userSchema)
 module.exports = registerModel