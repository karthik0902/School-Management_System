import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable({obj}) {

  return (
    <TableContainer sx={{borderRadius:'20px'}} component={Paper}>

      <Table sx={{ minWidth: 650 ,backgroundColor:'lightblue',borderRadius:'20px'}} aria-label="simple table">

        <TableHead>
           
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell align="left">EMP ID</TableCell>
            <TableCell align="left">ROLE</TableCell>
        
          </TableRow>

        </TableHead>
        {obj?obj.map((row) => (

        <TableBody>
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.empid}</TableCell>
              <TableCell align="left">{row.role}</TableCell>
            </TableRow>
        </TableBody>
                                )):<p>No RECORDS FOUND</p>}



      </Table>

    </TableContainer>
  );
}
