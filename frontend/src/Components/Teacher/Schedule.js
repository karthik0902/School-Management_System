import React, { useState } from 'react';
import {teacherSchedulePost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// Schedule component
const Schedule = ({obj}) => {
  const { teachertoken} = useContext(UserContext);
  const empid=localStorage.getItem('empid')
  const teacherToken=localStorage.getItem('teacherToken')

  const [subject, setSub] = useState();
  const [time, setTime] = useState();


  const addClass = async(sub, time) => {
    console.log(empid);


   
    await teacherSchedulePost(empid,{sub:subject,time:time},teacherToken)
   

  };


  return (
    <div>
    <div style={{margin:"20px",marginLeft:'2%',marginRight:'75%',marginTop:'5%',backgroundColor:'lightblue',padding:'30px',borderRadius:'20px'}}>
      <h2>Class Schedule</h2>
      <TextField style={{margin:"10px"}}  id="standard-basic" label="Subject" variant="standard" onChange={(e)=>setSub(e.target.value)} /><br/>
   <TextField style={{margin:"10px"}}  id="standard-basic"  variant="standard" type='time'onChange={(e)=>setTime(e.target.value)} /><br/>

     

      <button style={{margin:"10px"}}  onClick={() => addClass(subject, time)}>Add</button>
     
    </div>
    <h4>Scheduled classes</h4>
    <TableContainer sx={{ borderRadius: '20px' ,width:'710px', backgroundColor: 'lightblue'}} component={Paper}>
      <Table sx={{ minWidth: '650px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">SUBJECT</TableCell>
            <TableCell align="left">Time</TableCell>

          </TableRow>
        </TableHead>
          {obj ? obj.map((row) => (
                    <TableBody key={row.studentId}>

            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sub}
              </TableCell>
              <TableCell align="left">{row.time}</TableCell>

            </TableRow>
                    </TableBody>

          )) : null}

      </Table>
    </TableContainer>
      
   
    </div>
  );
};
export default Schedule