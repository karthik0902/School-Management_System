import React, { useState } from 'react';
import {teacherSchedulePost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import {TeacherScheduleDelete,TeacherScheduleEdit} from "../../api"

import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import clsx from 'clsx';


// Schedule component
const Schedule = ({obj}) => {
  const { teachertoken} = useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const empid=localStorage.getItem('empid')
  const handleClose = () => setOpen(false);
  const [id,setid]= useState()

  const handleOpen = (id) => {setid(id);setOpen(true)};


  const teacherToken=localStorage.getItem('teacherToken')
  const [sub, setsub] = useState('');
  const [time1, settime1] = useState();

  const [subject, setSub] = useState();
  const [time, setTime] = useState();


  const addClass = async(sub, time) => {
    console.log(empid);


   
    await teacherSchedulePost(empid,{sub:subject,time:time},teacherToken)
   

  };
  async function edit(){
    try{
      const response= await TeacherScheduleEdit(empid,id,teacherToken,{sub:sub,time:time1})
      console.log(response);
   }
   catch(err){
     console.log(err);
   }

  }
  function del(id){
    try{
      TeacherScheduleDelete(empid,id,teacherToken)
    }
    catch(err){
      console.log(err);
    }
  }


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
            <TableCell align="left">EDIT/DELETE</TableCell>


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
              <TableCell align="left"><Button onClick={()=>handleOpen(row._id)}>Edit</Button><Button onClick={()=>del(row._id)}>Delete</Button></TableCell>


            </TableRow>
                    </TableBody>

          )) : null}

      </Table>
      <div>
     
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h2 id="unstyled-modal-title" className="modal-title">
            EDIT
          </h2>
          <TextField id="standard-basic" style={{margin:"10px"}}label="Subject:" variant="standard" type="text"
          name="sub"
          value={sub}
          onChange={(e)=>{setsub(e.target.value)}}/><br/>
      <TextField id="standard-basic" style={{margin:"10px"}}  variant="standard" type="time"
          name="time"
          value={time}
          onChange={(e)=>{settime1(e.target.value)}} /><br/>
      


         
          <button onClick={()=>edit()}>EDIT</button>
        </ModalContent>
      </Modal>
    </div>


    </TableContainer>
      
   
    </div>
  );
};
export default Schedule




const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);


