import React, { useState } from 'react';
import {teacherSchedulePost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';


// Schedule component
const Schedule = ({obj}) => {
  const { empid,setEmpid,teachertoken} = useContext(UserContext);

  const [subject, setSub] = useState();
  const [time, setTime] = useState();


  const addClass = async(sub, time) => {


   
    const response= await teacherSchedulePost(empid,{sub:subject,time:time},teachertoken)
   

  };


  return (
    <div>
    <div style={{margin:"20px",marginLeft:'2%',marginRight:'75%',backgroundColor:'white',padding:'30px',borderRadius:'20px'}}>
      <h2>Class Schedule</h2>
      <TextField style={{margin:"10px"}}  id="standard-basic" label="Subject" variant="standard" onChange={(e)=>setSub(e.target.value)} /><br/>
   <TextField style={{margin:"10px"}}  id="standard-basic"  variant="standard" type='time'onChange={(e)=>setTime(e.target.value)} /><br/>

     

      <button style={{margin:"10px"}}  onClick={() => addClass(subject, time)}>Add</button>
     
    </div>
    <h4>Scheduled classes</h4>
    <div style={{display:'flex',backgroundColor:'white',borderRadius:'15px',flexWrap:'wrap'}}>
      
      {obj&&
          obj.map((obj)=>{
            return <div  style={{margin:"15px",marginLeft:"15px" ,display:'flex'}} >
                <p>
                Subject :      {obj.sub}<br/>
                Time:    {obj.time}<br/>
      
                </p>
                
                
                </div>
          })
          
        }
      
      </div>
    </div>
  );
};
export default Schedule