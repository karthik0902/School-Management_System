const { time } = require("console");
const mongoose=require("../config/mongoose")
const ScheduleSchema =new mongoose.Schema({
    sub: String,
    time: String, 
   
   
 });
 const SyllabusSchema =new mongoose.Schema({
    sub: String,
    Syllabus: String, 
   
   
 });
 const SudentSchema =new mongoose.Schema({
    studentId: String,
    sub: String, 
    grade: String, 
    attendence: Number, 
   
   
 });
const userSchema =new mongoose.Schema({
    empid: String,
    password: String, 
    School_code:String,
    Syllabus:[SyllabusSchema],
    Schedule:[ScheduleSchema],
    student:[SudentSchema],
   
   
 });
 const TeacherModel =mongoose.model("TeacherUsers",userSchema)
 module.exports = TeacherModel