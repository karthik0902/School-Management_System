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
    const { setEmpid,teachertoken} = useContext(UserContext);
    const empid=localStorage.getItem('empid')
    const teacherToken=localStorage.getItem('teacherToken')




  
    const addGrade = async () => {
        const response= await PerformancePost(empid,{sub:sub,grade:grade,attendence:attendence,studentId:studentId},teacherToken)
        console.log(response);


    };
  
    return (
      <div style={{margin:"20px",marginLeft:'2%',marginTop:'5%',marginRight:'70%',backgroundColor:'lightblue',padding:'25px',borderRadius:'20px'}}>
         <h2>Performance Tracker</h2>
        <TextField style={{margin:"10px"}}   label="Student ID:" variant="standard" onChange={(e)=>setId(e.target.value)} type='text' /><br/>
        <TextField style={{margin:"10px"}}   label="Subject" variant="standard" onChange={(e)=>setsub(e.target.value)} type='text' /><br/>
        <TextField style={{margin:"10px"}}   label="Grade :" variant="standard" onChange={(e)=>setGrade(e.target.value)} type='text' /><br/>
        <TextField style={{margin:"10px"}}   label="Attendence" variant="standard" onChange={(e)=>setAttendence(e.target.value)} type='text' /><br/>




        <button style={{margin:"15px"}} onClick={() => addGrade()}>Add</button>
       
      </div>
    );
  };

  export default PerformanceTracker
  