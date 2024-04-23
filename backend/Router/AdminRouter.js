
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminRouter = express.Router();
const AdminModel =require("../models/adminModel")
const { secretKey } = require('../config/config');





AdminRouter.post('/signup', async (req, res) => {
    const student = await AdminModel.findOne({email:req.body.email}); //http://localhost:3002/student/signup

    if(student){
        return res.status(404).send('Student registered already');
    }
    else{
    try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    const student = AdminModel({ email: req.body.email, password: hashedPassword ,School_code:req.body.School_code,school_about:req.body.school_about,School_name:req.body.name}); 
    student.save();
    const token = jwt.sign({email :student.email}, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token,student });

    } catch (error) {

    console.error('Error registering student:', error); res.status(500).send('Internal Server Error');
    } }});



    AdminRouter.post('/login', async (req, res) => {
   
        const student = await AdminModel.findOne({email:req.body.email}); //http://localhost:3002/student/login
        if (!student) {
        return res.status(404).send('Student not found');
        }
        try {
            const passwordMatch = await bcrypt.compare( req.body.password,student.password);

            if (passwordMatch) {
                const token = jwt.sign({email :student.email}, secretKey, { expiresIn: '1h' });

            res.status(200).json({ token,student });
            }
            
            else{
                res.status(401).send('Incorrect password');
            }
            } catch (error) {
            
            res.status(500).send(error); } 
    });


    AdminRouter.post("/staff/:code",async (req,res)=>{
        try{
        let code = req.params.code;
        const { empid, name, role } = req.body;
    
        const adminUser = await AdminModel.findOne({ School_code: code });
        if (adminUser) {
            adminUser.teachers.push({ empid, name, role });
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


    AdminRouter.post("/student/:code",async (req,res)=>{
        try{
        let code = req.params.code;
        const { studentId, fee, payment } = req.body;
     
        const adminUser = await AdminModel.findOne({ School_code: code });
        if (adminUser) {
            adminUser.students.push({ studentId, fee, payment });
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


    AdminRouter.get("/",async (req,res)=>{
        try{
        let studentsList = await AdminModel.find();
        res.json(studentsList);
        }
        catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });





    
    

    



   



module.exports = AdminRouter