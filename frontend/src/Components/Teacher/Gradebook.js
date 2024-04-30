import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Gradebook = ({obj}) => {
    
    
    return (
      <div style={{marginTop:'5%'}}>
        <h2>Gradebook</h2>
        <TableContainer sx={{ borderRadius: '20px' }} component={Paper}>
      <Table sx={{ minWidth: 650, backgroundColor: 'lightblue', borderRadius: '20px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Id</TableCell>
            <TableCell align="left">SUBJECT</TableCell>
            <TableCell align="left">GRADE</TableCell>
            <TableCell align="left">Attendence</TableCell>

          </TableRow>
        </TableHead>
          {obj ? obj.map((row) => (
                    <TableBody key={row.studentId}>

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
                    </TableBody>

          )) : null}

      </Table>
    </TableContainer>
  
    
      </div>
    );
  };
  export default Gradebook

