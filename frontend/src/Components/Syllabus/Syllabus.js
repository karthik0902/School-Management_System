import React, { useState } from 'react';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import {teacherSyllabusPost} from "../../api"
import TextField from '@mui/material/TextField';



// Schedule component
const Syllabus = ({obj}) => {
    const { empid,setEmpid,teachertoken} = useContext(UserContext);


  const [subject, setSub] = useState();
  const [Syllabus, setSyllabus] = useState();


  const postSyllabus = async() => {
    const response=await teacherSyllabusPost(empid,{sub:subject,Syllabus:Syllabus},teachertoken)
    console.log(response);

  };

  return (
    <div>
    <div style={{margin:"20px",marginLeft:'2%',marginRight:'75%',backgroundColor:'white',padding:'30px',borderRadius:'20px'}}>
      <h2>Syllabus</h2>
      <TextField style={{margin:"10px"}}  id="standard-basic" label="Subject" variant="standard" onChange={(e)=>setSub(e.target.value)} type='text' /><br/>
      <TextField style={{margin:"10px"}}  id="standard-basic"label="Syllabus"  variant="standard" onChange={(e)=>setSyllabus(e.target.value)} type='text' /><br/>

      

      <button style={{margin:"20px"}}  onClick={() => postSyllabus()}>Add</button>
      
    </div>
    <h4>Syllabus </h4>
    <div style={{display:'flex',backgroundColor:'white',borderRadius:'15px',flexWrap:'wrap'}}>
      
      {obj&&
          obj.map((obj)=>{
            return <div  style={{margin:"15px",marginLeft:"15px" ,display:'flex'}} >
                <p>
                Subject :      {obj.sub}<br/>
                Syllabus:    {obj.Syllabus}<br/>
      
                </p>
                
                
                </div>
          })
          
        }
      
      </div>
    </div>
  );
};
export default Syllabus