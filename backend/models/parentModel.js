const mongoose=require("../config/mongoose")
const userSchema =new mongoose.Schema({
    email: String,
    password: String, 
   
   
 });
 const ParentModel =mongoose.model("PatentsUsers",userSchema)
 module.exports = ParentModel