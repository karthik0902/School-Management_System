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
            <img className='img1' src="https://img.freepik.com/free-vector/school-building-nature-scene_1308-29206.jpg?w=2000&t=st=1713846630~exp=1713847230~hmac=75b29615980f3ac9b640db0d7ec79d215eb14b52b950442c4829de6edaf22047" alt='school' />
            
           
        </div>
    );
};

export default GetStartedPage;
