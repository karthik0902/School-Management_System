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
      <p>The page you are looking for does not exist.</p>
     
      <button onClick={logout}>Back</button>

    </div>
  );
};

export default NotFound;
