import React from 'react';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
    let nav = useNavigate();
    let goBack = () => { nav(-1); }
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default NotFound;
