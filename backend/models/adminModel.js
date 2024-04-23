const mongoose=require("../config/mongoose")

const studentSchema =new mongoose.Schema({
    studentId: String,
    fee:Number,
    payment:String,
    totalfee:Number,

   
   
 });
 const staffSchema =new mongoose.Schema({
    
    empid:String,
    name:String,
    role:String,
   
   
 });




const userSchema =new mongoose.Schema({
    email: String,
    password: String, 
    students:[studentSchema],
    teachers:[staffSchema],
    image:String,
    School_name:String,
    School_code:String,
    school_about:String,
   
   
 });
 const AdminModel =mongoose.model("AdminUser",userSchema)
 module.exports = AdminModel