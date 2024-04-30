const mongoose=require("../config/mongoose")
const userSchema =new mongoose.Schema({
    email: String,
    password: String, 
    School_code:String,

   
   
 });
 const ParentModel =mongoose.model("PatentsUsers",userSchema)
 module.exports = ParentModel