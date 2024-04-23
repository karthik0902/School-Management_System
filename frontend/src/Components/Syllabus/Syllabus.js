import React, { useState } from 'react';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import {teacherSyllabusPost} from "../../api"


// Schedule component
const Syllabus = () => {
    const { empid,setEmpid,teachertoken} = useContext(UserContext);


  const [subject, setSub] = useState();
  const [Syllabus, setSyllabus] = useState();


  const postSyllabus = async() => {
    const response=await teacherSyllabusPost(empid,{sub:subject,Syllabus:Syllabus},teachertoken)
    console.log(response);

  };

  return (
    <div>
      <h2>Syllabus</h2>
      <input type='text' placeholder='subject' onChange={(e)=>setSub(e.target.value)}></input>
      <input type='text' placeholder='Syllabus' onChange={(e)=>setSyllabus(e.target.value)}></input>

      <button onClick={() => postSyllabus()}>Add</button>
      
    </div>
  );
};
export default Syllabus