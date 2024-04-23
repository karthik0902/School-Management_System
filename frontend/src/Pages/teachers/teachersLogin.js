// StudentAuthPage.js

import React, { useState } from 'react';
import './teachersLoginPage.css';
import {teacherLogin,teacherSignup} from "../../api"
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';


 // Import CSS file for styling

const TeachersAuthPage = () => {
    const { login,setteacherslogin,empid,setEmpid,teachertoken,setToken} = useContext(UserContext);
    const [loginFormData, setLoginFormData] = useState({ empid: '', password: '' });
    const [signupFormData, setSignupFormData] = useState({  empid: '', password: '' });
    const nav = useNavigate();
    const handleLoginChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const response = await teacherLogin(loginFormData);
        setEmpid(response.student.empid)
        setToken(response.token);
        setteacherslogin(true)
        nav('/teacherhome')
    };

    const handleSignupSubmit = async(e) => {
        e.preventDefault();
      
        const response = await teacherSignup(signupFormData);
        console.log(response)
        setteacherslogin(true)
        nav('/teacherhome')
    };

    return (
        <div className="student-auth-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input type="text" name="empid" placeholder="Empid" value={loginFormData.empid} onChange={handleLoginChange} required />
                    <input type="password" name="password" placeholder="Password" value={loginFormData.password} onChange={handleLoginChange} required />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                    <input type="text" name="empid" placeholder="Empid" value={signupFormData.empid} onChange={handleSignupChange} required />
                    <input type="password" name="password" placeholder="Password" value={signupFormData.password} onChange={handleSignupChange} required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default TeachersAuthPage;
