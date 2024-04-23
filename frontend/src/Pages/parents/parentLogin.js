

import React, { useState } from 'react';
import classnames from'./ParentLoginPage.css';
import {ParentLogin,ParentSignup} from "../../api"
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';




const ParentAuthPage = () => {
    const { login,setlogin,setParentslogin} = useContext(UserContext);
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
    const [signupFormData, setSignupFormData] = useState({  email: '', password: '' });
    const nav = useNavigate();
    const handleLoginChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
      
        const response = await ParentLogin(loginFormData);
        console.log(response)
        setParentslogin(true)
        nav('/home')
    };

    const handleSignupSubmit = async(e) => {
        e.preventDefault();
      
        const response = await ParentSignup(signupFormData);
        console.log(response)
        setlogin(true)
        nav('/home')
    };

    return (
        <div className="student-auth-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input type="text" name="email" placeholder="Email" value={loginFormData.email} onChange={handleLoginChange} required />
                    <input type="password" name="password" placeholder="Password" value={loginFormData.password} onChange={handleLoginChange} required />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                    <input type="text" name="email" placeholder="Email" value={signupFormData.email} onChange={handleSignupChange} required />
                    <input type="password" name="password" placeholder="Password" value={signupFormData.password} onChange={handleSignupChange} required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default ParentAuthPage;
