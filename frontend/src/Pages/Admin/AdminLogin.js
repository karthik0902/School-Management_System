

import React, { useState } from 'react';
import './AdminLoginPage.css';
import {AdminLogin,AdminSignup} from "../../api"
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';



const AdminAuthPage = () => {
    const { login,setAdminlogin ,code,setCode} = useContext(UserContext);
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
    const [signupFormData, setSignupFormData] = useState({ name: '', email: '', password: '' ,School_code:'',school_about:''});
    const nav = useNavigate();
    const handleLoginChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
      
        const response = await AdminLogin(loginFormData);
        setCode(response.student.School_code)
        setAdminlogin(true)
        nav('/adminhome')
    };

    const handleSignupSubmit = async(e) => {
        e.preventDefault();
   
        const response = await AdminSignup(signupFormData);
        setCode(response.student.School_code)
        console.log(response)
        setAdminlogin(true)
        nav('/adminhome')
    };

    return (
        <div className="student-auth-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input type="text" name="email" placeholder="Email" value={loginFormData.UserName} onChange={handleLoginChange} required />
                    <input type="password" name="password" placeholder="Password" value={loginFormData.password} onChange={handleLoginChange} required />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                    <input type="text" name="name" placeholder="School Name" value={signupFormData.name} onChange={handleSignupChange}  />
                    <input type="text" name="email" placeholder="Email" value={signupFormData.UserName} onChange={handleSignupChange} required />
                    <input type="text" name="School_code" placeholder="School code" value={signupFormData.School_code} onChange={handleSignupChange} required />
                    <input type="text" name="school_about" placeholder="school about" value={signupFormData.school_about} onChange={handleSignupChange} required />

                    <input type="password" name="password" placeholder="Password" value={signupFormData.password} onChange={handleSignupChange} required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default AdminAuthPage;
