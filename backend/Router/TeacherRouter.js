
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TeacherRouter = express.Router();
const TeacherModel =require("../models/teachersModel")
const { secretKey } = require('../config/config');





TeacherRouter.post('/signup', async (req, res) => {
    const student = await TeacherModel.findOne({empid:req.body.empid}); //http://localhost:3002/student/signup

    if(student){
        return res.status(404).send('Student registered already');
    }
    else{
    try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    const student = TeacherModel({ empid: req.body.empid, password: hashedPassword }); 
    student.save();
    const token = jwt.sign({empid :student.empid}, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token,student });

    } catch (error) {

    console.error('Error registering student:', error); res.status(500).send('Internal Server Error');
    } }});



    TeacherRouter.post('/login', async (req, res) => {
   
        const student = await TeacherModel.findOne({empid:req.body.empid}); //http://localhost:3002/student/login
        if (!student) {
        return res.status(404).send('Student not found');
        }
        try {
            const passwordMatch = await bcrypt.compare( req.body.password,student.password);

            if (passwordMatch) {
                const token = jwt.sign({empid :student.empid}, secretKey, { expiresIn: '1h' });
               

            res.status(200).json({ token,student });
            }
            
            else{
                res.status(401).send('Incorrect password');
            }
            } catch (error) {
            
            res.status(500).send(error); } 
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



    TeacherRouter.get("/",async (req,res)=>{
        try{
        let studentsList = await TeacherModel.find();
        res.json(studentsList);
        }
        catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    function loggingMiddleware(req, res, next) { 
        console.log("Inside Middleware");
        try {
            
            const token = req.headers.authorization ? req.headers.authorization.split(' ')[1]:null;
            if (!token) {
                return res.status(401).send('Authentication token failed!');
            }
            const decodedToken = jwt.verify(token, secretKey);
            console.log("outside");
            if(decodedToken){
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