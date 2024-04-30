import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({ obj }) {
  return (
    <TableContainer sx={{ borderRadius: '20px' }} component={Paper}>
      <Table sx={{ minWidth: 650, backgroundColor: 'lightblue', borderRadius: '20px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Id</TableCell>
            <TableCell align="left">FEE</TableCell>
            <TableCell align="left">PAYMENT</TableCell>
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
              <TableCell align="left">{row.fee}</TableCell>
              <TableCell align="left">{row.payment}</TableCell>
            </TableRow>
                    </TableBody>

          )) : <p>No RECORDS FOUND</p>}

      </Table>
    </TableContainer>
  );
}