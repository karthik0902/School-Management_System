const mongoose=require("../config/mongoose")
const userSchema =new mongoose.Schema({
    UserName: String,
    password: String, 
   
   
 });
 const registerModel =mongoose.model("StudentUsers",userSchema)
 module.exports = registerModel