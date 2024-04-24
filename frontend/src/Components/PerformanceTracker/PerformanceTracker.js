import React, { useState } from 'react';
import {PerformancePost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';






const PerformanceTracker = () => {
    const [studentId, setId] = useState();
    const [sub, setsub] = useState();
    const [grade, setGrade] = useState();
    const [attendence, setAttendence] = useState();
    const { empid,setEmpid,teachertoken} = useContext(UserContext);




  
    const addGrade = async () => {
        const response= await PerformancePost(empid,{sub:sub,grade:grade,attendence:attendence,studentId:studentId},teachertoken)
        console.log(response);


    };
  
    return (
      <div style={{margin:"20px",marginLeft:'2%',marginRight:'75%',backgroundColor:'white',padding:'30px',borderRadius:'20px'}}>
        <h2>Performance Tracker</h2>
        <TextField style={{margin:"10px"}}  id="standard-basic" label="Student ID:" variant="standard" onChange={(e)=>setId(e.target.value)} type='text' /><br/>
        <TextField style={{margin:"10px"}}  id="standard-basic" label="Subject" variant="standard" onChange={(e)=>setsub(e.target.value)} type='text' /><br/>
        <TextField style={{margin:"10px"}}  id="standard-basic" label="Grade :" variant="standard" onChange={(e)=>setGrade(e.target.value)} type='text' /><br/>
        <TextField style={{margin:"10px"}}  id="standard-basic" label="Attendence" variant="standard" onChange={(e)=>setAttendence(e.target.value)} type='text' /><br/>




        <button style={{margin:"20px"}} onClick={() => addGrade()}>Add</button>
       
      </div>
    );
  };

  export default PerformanceTracker
  