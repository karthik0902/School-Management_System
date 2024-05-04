
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ParentRouter = express.Router();
const ParentModel =require("../models/parentModel")
const { secretKey } = require('../config/config');
const adminModel= require('../models/adminModel')
const TeacherModel =require("../models/teachersModel")







ParentRouter.post('/signup', async (req, res) => {
        const Teacher = await ParentModel.findOne({email:req.body.email}); //http://localhost:3002/Teacher/signup
        const admin = await adminModel.findOne({ School_code: req.body.School_code });
        
    
       if(admin){
   
    
    
        if(Teacher){
            return res.status(404).send('Parent registered already');
        }
        else{
        try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const Teacher = ParentModel({ email: req.body.email, password: hashedPassword ,School_code:req.body.School_code}); 
        await Teacher.save();
        const token = jwt.sign({email :Teacher.email}, secretKey, { expiresIn: '1h' });
        Teacher.password= null;
    
        res.status(200).json({ token,Teacher });
    
        } catch (error) {
    
        console.error('Error registering Teacher:', error); res.status(500).send('Internal Server Error');
        }
    }
    
   
       }
    else{
        res.status(401).send('School code not found ');
      }
    
    }
    );
    
    
    
    ParentRouter.post('/login', async (req, res) => {
       
            const student = await ParentModel.findOne({email:req.body.email}); //http://localhost:3002/student/login
            const admin = await adminModel.findOne({ School_code: req.body.School_code });
            if(admin){
    
    
     
            if (!student) {
            return res.status(404).send('email is not Registered');
            }
            try {
                const passwordMatch = await bcrypt.compare( req.body.password,student.password);
    
                if (passwordMatch) {
                    const token = jwt.sign({email :student.email}, secretKey, { expiresIn: '1h' });
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
            res.status(401).send('School code not found ');
    
        }
        });

        ParentRouter.use(loggingMiddleware)
        ParentRouter.get('/studentlist/:id',async(req,res)=>{
            try{
                const id = req.params.id
                const teachersList = await TeacherModel.find();
                const scheduleList = teachersList.map(teacher => teacher.student);
                const flatData = scheduleList.flat();
                const studentData = flatData.filter(item => item.studentId === id);
                res.send(studentData);
                }
                catch (error) {
                    res.status(500).json({ error: 'Internal server error' });
                }
    
        })




        function loggingMiddleware(req, res, next) { 

            try {
                
                const token = req.headers.authorization ? req.headers.authorization.split(' ')[1]:null;
                if (!token) {
                    return res.status(401).send('Authentication token failed!');
                }
                const decodedToken = jwt.verify(token, secretKey);
                if(decodedToken){
                    console.log('Parent Authentication Sucess!'); 
                    next(); 
    
                }else{
                    console.log(err+'Authentication failed!', 401); 
                }
                
            } catch (err) {
                console.log(err+' Authentication failed!', 401); 
                next()
                
               
                
            }
        }
    
        
    
    


    
    

    



   



module.exports = ParentRouter