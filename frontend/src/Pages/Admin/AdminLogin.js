

import React, { useState } from 'react';
import './AdminLoginPage.css';
import {AdminLogin,AdminSignup} from "../../api"
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';




const AdminAuthPage = () => {
    const { setAdminlogin ,setCode,setAdminToken} = useContext(UserContext);
    const[email,setemail]=useState('')
    const[password,setPassword]=useState('')
    const[email1,setemail1]=useState('')
    const[password1,setPassword1]=useState('')
    const[School_code,setSchool_code]=useState('')
    const[school_about,setschool_about]=useState('')
    const[name,setname]=useState('')
    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');

    const nav = useNavigate();
  

 

    const handleLoginSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await AdminLogin({email:email,password:password});
            setAdminToken(response.token)
        setCode(response.student.School_code)
        setAdminlogin(true)
            nav('/adminhome');
        } catch (error) {
            console.log(error);
            setLoginError(error.response.data.error);
        }
      
        
   
    };

    const handleSignupSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await AdminSignup({ name: name, email:email1 , password: password1,School_code:School_code,school_about:school_about});
            setCode(response.student.School_code)
        setAdminToken(response.token)
        setAdminlogin(true)
            nav('/adminhome');
        } catch (error) {
            setSignupError(error.message);
        }
   
       
    };

    return (
        <div className="student-auth-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                <TextField id="standard-basic" style={{margin:"10px"}} onChange={(e)=>setemail(e.target.value)} label="Email" variant="standard" name="email"  required />
                <TextField id="standard-basic" style={{margin:"10px"}} onChange={(e)=>setPassword(e.target.value)} label="Password" variant="standard" type="password" name="password"   required />


                    <button style={{margin:"20px"}} type="submit">Login</button>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                </form>
            </div>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                <TextField id="standard-basic" style={{margin:"10px"}} label="School Name" variant="standard" type="text" name="name" onChange={(e)=>setname(e.target.value)}  />
                <TextField id="standard-basic" style={{margin:"10px"}} label="Email" variant="standard"  type="text" name="email" onChange={(e)=>setemail1(e.target.value)}  required  />
                <TextField id="standard-basic" style={{margin:"10px"}} label="School code" variant="standard" type="text" name="School_code" onChange={(e)=>setSchool_code(e.target.value)}  required  />
                <TextField id="standard-basic" style={{margin:"10px"}} label="school about" variant="standard" type="text" name="school_about" onChange={(e)=>setschool_about(e.target.value)}  required />
                <TextField id="standard-basic" style={{margin:"10px"}} label="password" variant="standard" type="password" name="password" onChange={(e)=>setPassword1(e.target.value)}  required />


                    <button style={{margin:"20px"}} type="submit">Sign Up</button>
                    {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
                </form>
            </div>
        </div>
    );
};

export default AdminAuthPage;
