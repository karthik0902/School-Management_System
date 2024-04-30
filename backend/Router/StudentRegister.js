
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerRouter = express.Router();
const registerModel =require("../models/registerModel")
const { secretKey } = require('../config/config');
const teachersModel= require('../models/teachersModel')
const adminModel= require('../models/adminModel')







registerRouter.post('/signup', async (req, res) => {
    const student = await registerModel.findOne({UserName:req.body.UserName}); //http://localhost:3002/student/signup
    const admin = await adminModel.findOne({School_code:req.body.School_code})
    if(admin){
        const studentid = admin.students.find(students => students.studentId === req.body.UserName);
        if (studentid){


    if(student){
        return res.status(404).send('Student registered already');
    }
    else{
    try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    const student = registerModel({ UserName: req.body.UserName, password: hashedPassword ,School_code:req.body.School_code}); 
    student.save();
    const token = jwt.sign({UserName :student.UserName}, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token,student });

    } catch (error) {

    console.error('Error registering student:', error); res.status(500).send('Internal Server Error');
    } }}
    else{
        res.status(404).send('studentid not registered');

       

    }
}

    else{
        return res.status(404).send('School not registered');


    }
});



    registerRouter.post('/login', async (req, res) => {
   
        const student = await registerModel.findOne({UserName:req.body.UserName}); //http://localhost:3002/student/login
        const admin = await adminModel.findOne({School_code:req.body.School_code})
    if(admin){
        const studentid = admin.students.find(students => students.studentId === req.body.UserName);

        if (studentid){


        if (!student) {
        return res.status(404).send('Student not found');
        }
        try {
            const passwordMatch = await bcrypt.compare( req.body.password,student.password);

            if (passwordMatch) {
                const token = jwt.sign({UserName :student.UserName}, secretKey, { expiresIn: '1h' });

            res.status(200).json({ token,student });
            }
            
            else{
                res.status(401).send('Incorrect password');
            }
            } catch (error) {
            
            res.status(500).send(error); }
     } else{
         res.status(404).send('studentid not registered');

        

     }}
            else{
                 res.status(404).send('School not registered');
        
        
            }
    });


    registerRouter.use(loggingMiddleware)
    registerRouter.get('/Syllabus/:code',async(req,res)=>{
        let code = req.params.code
        try{
            const teachersList = await teachersModel.find({School_code:code});
            const scheduleList = teachersList.map(teacher => teacher.Syllabus);
            const s= scheduleList.flat()
            res.json(s);
            }
            catch (error) {
                console.error('Error fetching students:', error);
                res.status(500).json({ error: 'Internal server error' });
            }

    })
    registerRouter.get('/Schedule/:code',async(req,res)=>{
        let code = req.params.code

        try{
            const teachersList = await teachersModel.find({School_code:code});
            const scheduleList = teachersList.map(teacher => teacher.Schedule);
            const s= scheduleList.flat()

            res.json(s);
            }
            catch (error) {
                console.error('Error fetching students:', error);
                res.status(500).json({ error: 'Internal server error' });
            }

    })
    



 



    



    registerRouter.get('/studentlist/:id',async(req,res)=>{
        try{
            const id = req.params.id
            const teachersList = await teachersModel.find();
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
                console.log('Student Authentication Sucess!'); 
                next(); 

            }else{
                console.log(err+'Authentication failed!', 401); 
            }
            
        } catch (err) {
            console.log(err+' Authentication failed!', 401); 
            next()
            
           
            
        }
    }

    



   



module.exports = registerRouter