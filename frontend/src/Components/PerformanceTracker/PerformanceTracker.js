import React, { useState } from 'react';
import {PerformancePost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';





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
      <div>
        <h2>Performance Tracker</h2>
        <input type='text' placeholder='id' onChange={(e)=>setId(e.target.value)} ></input>
        <input type='text' placeholder='sub'  onChange={(e)=>setsub(e.target.value)} ></input>
        <input type='text' placeholder='grade'  onChange={(e)=>setGrade(e.target.value)} ></input>
        <input type='text' placeholder='attendence'  onChange={(e)=>setAttendence(e.target.value)} ></input>



        <button onClick={() => addGrade()}>Add</button>
       
      </div>
    );
  };

  export default PerformanceTracker
  