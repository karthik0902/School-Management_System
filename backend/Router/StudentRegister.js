
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerRouter = express.Router();
const registerModel =require("../models/registerModel")
const { secretKey } = require('../config/config');
const teachersModel= require('../models/teachersModel')





registerRouter.post('/signup', async (req, res) => {
    const student = await registerModel.findOne({UserName:req.body.UserName}); //http://localhost:3002/student/signup

    if(student){
        return res.status(404).send('Student registered already');
    }
    else{
    try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    const student = registerModel({ UserName: req.body.UserName, password: hashedPassword }); 
    student.save();
    const token = jwt.sign({UserName :student.UserName}, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token,student });

    } catch (error) {

    console.error('Error registering student:', error); res.status(500).send('Internal Server Error');
    } }});



    registerRouter.post('/login', async (req, res) => {
   
        const student = await registerModel.findOne({UserName:req.body.UserName}); //http://localhost:3002/student/login
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
    });
    registerRouter.get('/Syllabus',async(req,res)=>{
        try{
            const teachersList = await teachersModel.find();
            const scheduleList = teachersList.map(teacher => teacher.Syllabus);
            res.json(scheduleList);
            }
            catch (error) {
                console.error('Error fetching students:', error);
                res.status(500).json({ error: 'Internal server error' });
            }

    })


    registerRouter.use(loggingMiddleware)


    
    registerRouter.get('/Schedule',async(req,res)=>{
        try{
            const teachersList = await teachersModel.find();
            const scheduleList = teachersList.map(teacher => teacher.Schedule);
            res.json(scheduleList);
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
            res.json(studentData);
            }
            catch (error) {
                console.error('Error fetching students:', error);
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
            console.log("Authentication Success");
            if(decodedToken){
                res.send("Authentication Success")
                next(); 

            }else{
                console.log(err+'Authentication failed!', 401); 
            }
            
        } catch (err) {
            console.log(err+'Authentication failed!', 401); 
            next();
           
            
        }
    }

    



   



module.exports = registerRouter