import React, { useState } from 'react';
import { GetSutentlist1 } from "../../api";
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

const ReportCard = () => {
    const [value, setValue] = useState('');
    const [data,setData]= useState()
    const parentToken = localStorage.getItem('parentToken')
    const [error,seterror]=useState(null)


    

    const search = async () => {
        try {
        

            const response = await GetSutentlist1(value,parentToken);
            setData(response);
          
        } catch (error) {
          seterror(error)
            console.error("Error fetching student data:", error);
      
        }
    };

    return (
        <div>            <h4 style={{marginTop:'4%'}}>Search Report Card by Id</h4>
        <div style={{ backgroundColor: 'lightblue', margin: '1%', padding: '30px', borderRadius: '20px', marginRight: '70%' ,marginTop:'4%',display:'flex'}} className="report-card">
        <TextField id="standard-basic" style={{margin:"10px",width:'90%'}} label="ID" variant="standard"onChange={(e) => setValue(e.target.value)}  type="text"></TextField>

            <button style={{margin:'10%',marginLeft:'10%',marginTop:'10%'}} onClick={search}>Search</button>
            

           
        </div>

        {data?
             <div  style={{margin:"10px",marginLeft:"15px"}} >
                 <TableContainer sx={{ borderRadius: '20px' ,width:'710px', backgroundColor: 'lightblue'}} component={Paper}>
      <Table sx={{ minWidth: '650px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Student Id</TableCell>
            <TableCell align="left">Subject</TableCell>
            <TableCell align="left">Grade</TableCell>
            <TableCell align="left">Attendence</TableCell>


          </TableRow>
        </TableHead>
        {data?data.map((row)=>{ 

return  <TableBody key={row.studentId}>

            <TableRow
              key={row.studentId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.studentId}
              </TableCell>
              <TableCell align="left">{row.sub}</TableCell>
              <TableCell align="left">{row.grade}</TableCell>
              <TableCell align="left">{row.attendence}</TableCell>


            </TableRow>
                    </TableBody>}) :null}


      </Table>
    </TableContainer>
               
                
                </div>
          :null}


{error?<p>{error}</p>:null}

        </div>

    );
};

export default ReportCard;
