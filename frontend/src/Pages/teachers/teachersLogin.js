

import React, { useState } from 'react';
import './teachersLoginPage.css';
import {teacherLogin,teacherSignup} from "../../api"
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';


//School_code


const TeachersAuthPage = () => {
    const { empid,setEmpid,setToken} = useContext(UserContext);
    const [emp,setEmp]=useState('')
    const [emp1,setEmp1]=useState('')
    const [password,setPassword]=useState('')
    const [School_code,setSchool_code]=useState('')
    const [School_code1,setSchool_code1]=useState('')

    const [password1,setPassword1]=useState('')
    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');
    

    const nav = useNavigate();
   

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await teacherLogin({ empid:emp , password:password,School_code:School_code});
        localStorage.setItem('empid',response.student.empid)
        localStorage.setItem('teacherToken',response.token)

        setEmpid(response.student.empid)
        setToken(response.token);
        localStorage.setItem("teacherlogin",true)
        
        
        nav('/teacherhome')
        } catch (error) {
            console.log(error);
            setLoginError(error.response.data);
        }
       
    };

    const handleSignupSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await teacherSignup({ empid:emp1 , password:password1 ,School_code:School_code1});
            console.log(response);
            localStorage.setItem('empid',response.Teacher.empid)
            localStorage.setItem('teacherToken',response.token)
            localStorage.setItem("teacherlogin",true)
            nav('/teacherhome')
        
        
        nav('/teacherhome')
        } catch (error) {
           
            setSignupError(error.response.data);
        }
       
      
      
    };

    return (
        <div className="student-auth-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                <TextField  style={{margin:'10px'}} label="School code" variant="standard" type="text" name="School_code"  onChange={(e)=>setSchool_code(e.target.value)}  required/>

                <TextField  style={{margin:'10px'}} label="Emp Id" variant="standard" type="text" name="empid"  onChange={(e)=>setEmp(e.target.value)}  required/>
                <TextField  style={{margin:'10px'}}  label="Password" variant="standard" type="password" name="password" onChange={(e)=>setPassword(e.target.value)}  required />


                    <button style={{margin:"25px"}}type="submit">Login</button>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

                </form>
            </div>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                <TextField  style={{margin:'10px'}} label="School code" variant="standard" type="text" name="School_code"  onChange={(e)=>setSchool_code1(e.target.value)}  required/>

                <TextField  style={{margin:'10px'}} label="Emp Id" variant="standard" name="empid"  onChange={(e)=>setEmp1(e.target.value)}  required  />
                <TextField style={{margin:'10px'}}  label="Password" variant="standard" name="password" onChange={(e)=>setPassword1(e.target.value)}  required  />

                    
                    <button style={{margin:"25px"}} type="submit">Sign Up</button>
                    {signupError && <p style={{ color: 'red' }}>{signupError}</p>}

                </form>
            </div>
        </div>
    );
};

export default TeachersAuthPage;
