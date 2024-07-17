import React, { useState } from 'react';
import {AdminStudentPost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import BasicTable from './StudentList';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './styles.css'; 



const FeeManagement = ({obj}) => {
  const { code,setCode,Admintoken} = useContext(UserContext);
  const [error,seterror]=useState(null)

  const [studentId, setstudentId] = useState('');
  const [fee, setfee] = useState('');
  const [payment, setpayment] = useState('');


  const [res,setres]=useState(null)


  

  

  const addFee = async () => {
   
    const logincode = localStorage.getItem('logincode')//AdminToken
    const AdminToken = localStorage.getItem('AdminToken')//AdminToken

    
    try{
    const response= await AdminStudentPost(logincode,{
      studentId:studentId,
      fee:fee,
      payment:payment,
    },AdminToken)
    setres(response)
    console.log(response);
    }catch(err){
      seterror(err)
      console.log(err);
    }
  };
  const handlePaymentStatusChange = (event) => {
    setpayment(event.target.value);
  };

  console.log(payment);



  return (
    <div  style={{marginTop:'30px'}}>
    <div className='add-container' >
      <h2>Add Student</h2>
      <TextField id="standard-basic" style={{margin:"10px"}}label="Student Id:" variant="standard" type="text"
          name="studentId"
          value={studentId}
          onChange={(e)=>{setstudentId(e.target.value)}}/><br/>
      <TextField id="standard-basic" style={{margin:"10px"}} label="Amount:" variant="standard" type="number"
          name="fee"
          value={fee}
          onChange={(e)=>{setfee(e.target.value)}} /><br/>
      

<FormControl style={{margin:"10px"}} >
      <FormLabel id="demo-row-radio-buttons-group-label">Payment status:</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={payment}
        onChange={handlePaymentStatusChange}
      >
        <FormControlLabel value="Success" control={<Radio />} label="Success" />
        <FormControlLabel value="Failed" control={<Radio />} label="Failed" />
       
      </RadioGroup>
    </FormControl>

      
      
      <button style={{margin:"15px"}} onClick={addFee}>Add Student</button>
      {error?<p  style={{ color: 'red',marginLeft:"55px" }}>{error}</p>:null}
      {res?<p  style={{ color: 'red',marginLeft:"55px" }}>{res}</p>:null}


      </div>
      <h4>STUDENT LIST</h4>
      <BasicTable obj={obj}/>



    
     
    </div>
  );
};


export default FeeManagement;
