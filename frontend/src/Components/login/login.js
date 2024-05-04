import React, { useState } from 'react';
import './login.css'; // Make sure to import your CSS file
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import {teacherLogin,teacherSignup} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';



const SignUpSignInForm = () => {
    const [signIn, setSignIn] = useState(true);
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
            localStorage.setItem('empid',response.Teacher.empid)
            localStorage.setItem('teacherToken',response.token)
            localStorage.setItem("teacherlogin",true)
            nav('/teacherhome')
        
        
        nav('/teacherhome')
        } catch (error) {
           
            setSignupError(error.response.data);
        }
       
      
      
    };

    const toggle = () => {
        setSignIn(prevState => !prevState);
     
    }

    return (
        <div id="container" className={`container ${signIn ? 'sign-in' : 'sign-up'}`}>
            <div className="row">
               
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <div className="form sign-up">
                            <div className="input-group">
                                <i className='bx bxs-user'></i>
                                <input type="text" placeholder="School_code" onChange={(e)=>setSchool_code1(e.target.value)}  required/>
                            </div>
                            <div className="input-group">
                                <i className='bx bx-mail-send'></i>
                                <input type="email" placeholder="Email" onChange={(e)=>setEmp1(e.target.value)}  required/>
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
                                <input type="text" placeholder="School_code" onChange={(e)=>setSchool_code(e.target.value)}  required/>
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input type="text" placeholder="Email" onChange={(e)=>setEmp(e.target.value)} required/>
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
}

export default SignUpSignInForm;
