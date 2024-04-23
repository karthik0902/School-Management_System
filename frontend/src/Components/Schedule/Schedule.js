import React, { useState } from 'react';
import {teacherSchedulePost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';


// Schedule component
const Schedule = () => {
  const { empid,setEmpid,teachertoken} = useContext(UserContext);

  const [subject, setSub] = useState();
  const [time, setTime] = useState();


  const addClass = async(sub, time) => {
    console.log(teachertoken);

   
    const response= await teacherSchedulePost(empid,{sub:subject,time:time},teachertoken)
    console.log(response);

  };

  return (
    <div >
      <h2>Class Schedule</h2>
      <input type='text' placeholder='subject' onChange={(e)=>setSub(e.target.value)}>

      </input>
      <input type='time' onChange={(e)=>setTime(e.target.value)}></input>

      <button onClick={() => addClass(subject, time)}>Add</button>
     
    </div>
  );
};
export default Schedule