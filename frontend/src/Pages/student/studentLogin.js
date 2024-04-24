

import React, { useState } from 'react';
import './StudentLoginPage.css';
import {studentLogin,studentSignup} from "../../api"
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';





const StudentAuthPage = () => {
    const { login,setlogin} = useContext(UserContext);
    const [email,setEmail]=useState('')
    const [email1,setEmail1]=useState('')
    const [password,setPassword]=useState('')
    const [password1,setPassword1]=useState('')
    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');

  
    const nav = useNavigate();
   

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await studentLogin({ UserName: email , password: password });

      
        setlogin(true)
  
        nav('/studenthome')
        } catch (error) {
            setLoginError(error.response.data);
        }
     
       
    };

    const handleSignupSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await studentSignup({ UserName: email1 , password: password1 });
      
            setlogin(true)
            nav('/studenthome')
        } catch (error) {
            setSignupError(error.response.data);
        }
      
     
       
    };

    return (
        <div className="student-auth-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <TextField id="standard-basic" style={{margin:"10px"}} label="Email" variant="standard" type="text" onChange={(e)=>setEmail(e.target.value)}  required/>
                    <TextField id="standard-basic" style={{margin:"10px"}} label="Password" variant="standard" type="password" onChange={(e)=>setPassword(e.target.value)}  required />

                    <button style={{margin:"15px"}} type="submit">Login</button>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

                </form>
            </div>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                <TextField id="standard-basic" style={{margin:"10px"}} label="Email" variant="standard" onChange={(e)=>setEmail1(e.target.value)} placeholder="Email" required/>
                <TextField id="standard-basic" style={{margin:"10px"}} label="Password" variant="standard"  onChange={(e)=>setPassword1(e.target.value)} placeholder="Email"  required/>

                    <button style={{margin:"15px"}} type="submit">Sign Up</button>
                    {signupError && <p style={{ color: 'red' }}>{signupError}</p>}

                </form>
            </div>
        </div>
    );
};

export default StudentAuthPage;
