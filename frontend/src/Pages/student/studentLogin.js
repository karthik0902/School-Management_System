

import React, { useState } from 'react';
import './StudentLoginPage.css';
import {studentLogin,studentSignup} from "../../api"
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';






const StudentAuthPage = () => {
    const { setstudentToken} = useContext(UserContext);
    const [signIn, setSignIn] = useState(true);

    const [email,setEmail]=useState('')
    const [School_code,setSchoolcode]=useState()
    const [School_code1,setSchool_code1]=useState()
    const [email1,setEmail1]=useState('')
    const [password,setPassword]=useState('')
    const [password1,setPassword1]=useState('')
    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');

  
    const nav = useNavigate();
    const toggle = () => {
        setSignIn(prevState => !prevState);
     
    }
   

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
           const response=  await studentLogin({ UserName: email , password: password ,School_code:School_code});   
           setstudentToken(response.token);
           localStorage.setItem('studentToken',response.token)
           localStorage.setItem('studentUser',response.student.School_code)

        localStorage.setItem("studentlogin",true)
  
        nav('/studenthome')
        } catch (error) {
            setLoginError(error.response.data);
        }
     
       
    };

    const handleSignupSubmit = async(e) => {
        e.preventDefault();
        try {
            const response= await studentSignup({ UserName: email1 , password: password1,School_code:School_code1 });
            localStorage.setItem('studentToken',response.token)

            localStorage.setItem("studentlogin",true)
            localStorage.setItem('studentUser',response.student.School_code)


            nav('/studenthome')
        } catch (error) {
            setSignupError(error.response.data);
        }
      
     
       
    };

    return (
        <div id="container" className={`container ${signIn ? 'sign-in' : 'sign-up'}`}>
        <div className="row">
        <CssBaseline /><CssBaseline />

            <div className="col align-items-center flex-col sign-up">
                <div className="form-wrapper align-items-center">
                    <div className="form sign-up">
                        <div className="input-group">
                            <i className='bx bxs-user'></i>
                            <input type="text" placeholder="School_code" onChange={(e)=>setSchool_code1(e.target.value)}  required/>
                        </div>
                        <div className="input-group">
                            <i className='bx bx-mail-send'></i>
                            <input type="email" placeholder="Email" onChange={(e)=>setEmail1(e.target.value)}  required/>
                        </div>
                        <div className="input-group">
                            <i className='bx bxs-lock-alt'></i>
                            <input type="password" placeholder="Password" onChange={(e)=>setPassword1(e.target.value)} required/>
                        </div>
                       
                        <button onClick={handleSignupSubmit}>
                            Sign up
                        </button>
                        {signupError && <p style={{ color: 'red' }}>{signupError}</p>}

                        <p>
                            <span>
                                Already have an account?
                            </span>
                            <b onClick={toggle} className="pointer">
                                Sign in here
                            </b>
                        </p>
                    </div>
                </div>
            </div>
            {/* END SIGN UP */}
            {/* SIGN IN */}
            <div className="col align-items-center flex-col sign-in">
                <div className="form-wrapper align-items-center">
                    <div className="form sign-in">
                        <div className="input-group">
                            <i className='bx bxs-user'></i>
                            <input type="text" placeholder="School_code" onChange={(e)=>setSchoolcode(e.target.value)}  required/>
                        </div>
                        <div className="input-group">
                            <i className='bx bxs-lock-alt'></i>
                            <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>
                        <div className="input-group">
                            <i className='bx bxs-lock-alt'></i>
                            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
                        </div>
                        <button onClick={handleLoginSubmit}>
                            Sign in
                        </button>
                        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}

                        
                        <p>
                            <span>
                                Don't have an account?
                            </span>
                            <b onClick={toggle} className="pointer">
                                Sign up here
                            </b>
                        </p>
                    </div>
                </div>
                <div className="form-wrapper">
                    {/* Add any additional content */}
                </div>
            </div>
            {/* END SIGN IN */}
        </div>
        {/* END FORM SECTION */}
        {/* CONTENT SECTION */}
        <div className="row content-row">
            {/* SIGN IN CONTENT */}
            <div className="col align-items-center flex-col">
                <div className="text sign-in">
                    <h2 style={{color:'white'}}> 
                        Welcome
                    </h2>
                </div>
                <div className="img sign-in">
                    {/* Add any additional content */}
                </div>
            </div>
            {/* END SIGN IN CONTENT */}
            {/* SIGN UP CONTENT */}
            <div className="col align-items-center flex-col">
                <div className="img sign-up">
                    {/* Add any additional content */}
                </div>
                <div className="text sign-up">
                    <h2 style={{color:'white'}}>
                        Join with us
                    </h2>
                </div>
            </div>
            {/* END SIGN UP CONTENT */}
        </div>
        {/* END CONTENT SECTION */}
    </div>
    );
};

export default StudentAuthPage;
