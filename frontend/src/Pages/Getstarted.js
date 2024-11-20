import React from 'react';
import { useNavigate } from 'react-router-dom';
import className from "./Getstarted.css"
import Button from '@mui/material/Button';


const GetStartedPage = () => {
    const nav = useNavigate();
    return (
        <div className="get-started-page">
            
            <div className="Heading-button">
            <h1>Welcome to School Management System</h1>
            <Button id='heading-btn' onClick={()=>nav('/choose')} variant="outlined">Lets get started</Button>
      
            </div>
            
           
        </div>
    );
};

export default GetStartedPage;
