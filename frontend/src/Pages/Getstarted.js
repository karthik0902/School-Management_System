import React from 'react';
import { useNavigate } from 'react-router-dom';
import className from "./Getstarted.css"
import Button from '@mui/material/Button';


const GetStartedPage = () => {
    const nav = useNavigate();
    return (

            
            <div className="homepage">
                <div class="parent-container">
                    <div class="circle"></div>
                </div>
                <div class="parent-container-1">
                    <div class="circle-1"></div>
                </div>
                <div class="parent-container-2">
                    <div class="circle-2"></div>
                </div>
                <div className='black-backgrond'></div>
            <h1>Welcome to School Management System</h1>
    
            <button className='getstarted-btn' onClick={()=>nav('/choose')}>Get Started</button>
      
            </div>
    );
};

export default GetStartedPage;
