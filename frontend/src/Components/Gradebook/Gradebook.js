import React, { useState } from 'react';


const Gradebook = ({obj}) => {
    
    
    return (
      <div>
        <h2>Gradebook</h2>
  
    <div style={{display:'flex',backgroundColor:'white',borderRadius:'15px',flexWrap:'wrap'}}>
      
      {obj&&
          obj.map((obj)=>{
            return <div  style={{margin:"15px",marginLeft:"25px" ,display:'flex'}} >
                <p>
                  Student Id:   {obj.studentId}<br/>
                Subject :      {obj.sub}<br/>
                Grade: {obj.grade}<br/>
                Attendence:    {obj.attendence}<br/>
      
                </p>
                
                
                </div>
          })
          
        }
      
      </div>
      </div>
    );
  };
  export default Gradebook