
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TeacherRouter = express.Router();
const TeacherModel =require("../models/teachersModel")
const adminModel =require("../models/adminModel")
const { secretKey } = require('../config/config');





TeacherRouter.post('/signup', async (req, res) => {
    const Teacher = await TeacherModel.findOne({empid:req.body.empid}); //http://localhost:3002/Teacher/signup
    const admin = await adminModel.findOne({ School_code: req.body.School_code });
    

   if(admin){
    const teacher = admin.teachers.find(teacher => teacher.empid === req.body.empid);
    if(teacher){


    if(Teacher){
        return res.status(400).send('Teacher registered already');
    }
    else{
    try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    const Teacher = TeacherModel({ empid: req.body.empid, password: hashedPassword ,School_code:req.body.School_code}); 
    await Teacher.save();
    const token = jwt.sign({empid :Teacher.empid}, secretKey, { expiresIn: '1h' });
    Teacher.password= null;

    res.status(200).json({ token,Teacher });

    } catch (error) {

    console.error('Error registering Teacher:', error); res.status(500).send('Internal Server Error');
    }
}

}
else{
    res.status(401).send('Empid is not Registered by admin');

}
   }
else{
    res.status(401).send('School code not found ');
  }

}
);



    TeacherRouter.post('/login', async (req, res) => {
   
        const student = await TeacherModel.findOne({empid:req.body.empid}); //http://localhost:3002/student/login
        const admin = await adminModel.findOne({ School_code: req.body.School_code });
        if(admin){
        const teacher = admin.teachers.find(teacher => teacher.empid === req.body.empid);


      if(teacher){
        if (!student) {
        return res.status(404).send('Empid is not Registered');
        }
        try {
            const passwordMatch = await bcrypt.compare( req.body.password,student.password);

            if (passwordMatch) {
                const token = jwt.sign({empid :student.empid}, secretKey, { expiresIn: '1h' });
                student.password= null;
            res.status(200).json({ token,student });
            }
            
            else{
                res.status(401).send('Incorrect password');
            }
            } catch (error) {
            
            res.status(500).send(error); } 

      }
      else{
        res.status(401).send('Empid is not Registered by admin');


      }
    }
    else{
        res.status(401).send('School code not found ');

    }
    });





    TeacherRouter.use(loggingMiddleware)

    TeacherRouter.post("/Schedule/:empid",async (req,res)=>{
        try{
        let empid = req.params.empid;
        const { sub , time } = req.body;
     
        const adminUser = await TeacherModel.findOne({ empid: empid });
        if (adminUser) {
            adminUser.Schedule.push({ sub, time });
            await adminUser.save();
            res.json(adminUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
   
        }
        catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    TeacherRouter.delete("/Schedule/:code/:Id", async (req, res) => {
        try {
          let code = req.params.code;
          let Id = req.params.Id;
      
          const adminUser = await TeacherModel.findOne({ empid: code });
          if (adminUser) {
            const studentIndex = adminUser.Schedule.findIndex(
              (doc) => doc._id.equals(Id)
            );
       
      
            if (studentIndex >= 0) {
              adminUser.Schedule.splice(studentIndex, 1); 
              await adminUser.save();
              res.status(200).send("Success");
            } else {
              res.json({ error: "Student not found" });
            }
          } else {
            res.status(404).json({ error: "User not found" });
          }
        } catch (error) {
          console.error("Error deleting student:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      });




      TeacherRouter.put("/Schedule/:code/:Id", async (req, res) => {
        try {
          let code = req.params.code;
          let Id = req.params.Id;
          const { time ,sub} = req.body;
      
          const adminUser = await TeacherModel.findOne({ empid: code });
          if (adminUser) {

            const studentdata = adminUser.Schedule.findIndex(
              (doc) => doc._id.equals(Id)
            );
            if (studentdata >=0) {
                adminUser.Schedule[studentdata].sub = sub ||adminUser.Schedule[studentdata].sub;
              adminUser.Schedule[studentdata].time = time ||adminUser.Schedule[studentdata].time;
           
              await adminUser.save();
              res.status(200).send("Success");
            } else {
              res.status(404).json({ error: "Student not found" });
            }
          } else {
            res.status(404).json({ error: "User not found" });
          }
        } catch (error) {
          console.error("Error updating student:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      });


    TeacherRouter.post("/Syllabus/:empid",async (req,res)=>{
        try{
        let empid = req.params.empid;
        const { sub , Syllabus } = req.body;
     
        const adminUser = await TeacherModel.findOne({ empid: empid });
        if (adminUser) {
            adminUser.Syllabus.push({ sub, Syllabus });
            await adminUser.save();
            res.json(adminUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
   
        }
        catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });



    TeacherRouter.post("/Performance/:empid",async (req,res)=>{
        try{
        let empid = req.params.empid;
        const { sub , studentId,grade, attendence } = req.body;
     
        const adminUser = await TeacherModel.findOne({ empid: empid });
        if (adminUser) {
            adminUser.student.push({ sub , studentId,grade, attendence  });
            await adminUser.save();
            res.json(adminUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
   
        }
        catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });



    TeacherRouter.get("/data/:empid",async (req,res)=>{
        try{
            let empid = req.params.empid
        let teacherdata = await TeacherModel.findOne({empid:empid});
        res.json(teacherdata);
        }
        catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    function loggingMiddleware(req, res, next) { 
        try {
            
            const token = req.headers.authorization ? req.headers.authorization.split(' ')[1]:null;
            if (!token) {
                return res.status(401).send('Authentication token failed!');
            }
            const decodedToken = jwt.verify(token, secretKey);
            if(decodedToken){
                console.log('Teacher Authentication Sucess!'); 

                next(); 

            }else{
                console.log(err+'Authentication failed!', 401); 
            }
            
        } catch (err) {
            console.log(err+'Authentication failed!', 401); 
            next();
           
            
        }
    }
    
    


    
    

    



   



module.exports = TeacherRouter