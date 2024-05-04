import React from 'react';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
    let nav = useNavigate();
    


    const logout=()=>{
    

      nav('/choose')
  
      localStorage.setItem("studentlogin",false)
      localStorage.setItem("adminlogin",false)
      localStorage.setItem("teacherlogin",false)
      localStorage.setItem("parentlogin",false)
    }
  
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p style={{color:'red'}}>The page you are attempting to access does not exist. Please ensure that you properly log out of any other pages before proceeding.</p>
     
      <button onClick={logout}>logout</button>

    </div>
  );
};

export default NotFound;
