

import React, { useState } from 'react';
import './StudentLoginPage.css';
import {studentLogin,studentSignup} from "../../api"
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';





const StudentAuthPage = () => {
    const { login,setlogin} = useContext(UserContext);
    const [loginFormData, setLoginFormData] = useState({ UserName: '', password: '' });
    const [signupFormData, setSignupFormData] = useState({  UserName: '', password: '' });
    const nav = useNavigate();
    const handleLoginChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
     
        const response = await studentLogin(loginFormData);
        console.log(response)
        setlogin(true)
        nav('/studenthome')
    };

    const handleSignupSubmit = async(e) => {
        e.preventDefault();
     
        const response = await studentSignup(signupFormData);
        console.log(response)
        setlogin(true)
        nav('/studenthome')
    };

    return (
        <div className="student-auth-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <TextField id="standard-basic" style={{margin:"10px"}} label="Email" variant="standard" type="text" name="UserName"  value={loginFormData.UserName} onChange={handleLoginChange} required/>
                    <TextField id="standard-basic" style={{margin:"10px"}} label="Password" variant="standard" type="password" name="password" value={loginFormData.password} onChange={handleLoginChange} required />

                    <button style={{margin:"15px"}} type="submit">Login</button>
                </form>
            </div>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                    <input type="text" name="UserName" placeholder="Email" value={signupFormData.UserName} onChange={handleSignupChange} required />
                    <input type="password" name="password" placeholder="Password" value={signupFormData.password} onChange={handleSignupChange} required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default StudentAuthPage;
