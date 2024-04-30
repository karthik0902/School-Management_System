import React, { useState } from 'react';
import {AdminStudentPost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import BasicTable from './StudentList';


// Fee management component
const FeeManagement = ({obj}) => {
  const { code,setCode,Admintoken} = useContext(UserContext);
  const [error,seterror]=useState(null)
  const [res,setres]=useState(null)


  const [fees, setFees] = useState([]);
  const [newFee, setNewFee] = useState({
    studentId: '',
    fee: '',
    payment:'',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFee({
      ...newFee,
      [name]: value
    });
  };

  const addFee = async () => {
    setFees([...fees, newFee]);
    setNewFee({ studentId: '', fee: '' ,payment:''});
    const logincode = localStorage.getItem('logincode')//AdminToken
    const AdminToken = localStorage.getItem('AdminToken')//AdminToken

    
    try{
    const response= await AdminStudentPost(logincode,newFee,AdminToken)
    setres(response)
    console.log(response);
    }catch(err){
      seterror(err)
      console.log(err);
    }
  };



  return (
    <div style={{marginTop:'30px'}}>
    <div style={{margin:"20px",marginLeft:'2%',marginRight:'70%',backgroundColor:'lightblue',padding:'25px',borderRadius:'20px'}}>
      <h2>Add Student</h2>
      <TextField id="standard-basic" style={{margin:"10px"}}label="Student Id:" variant="standard" type="text"
          name="studentId"
          value={newFee.studentId}
          onChange={handleInputChange}/><br/>
      <TextField id="standard-basic" style={{margin:"10px"}} label="Amount:" variant="standard" type="number"
          name="fee"
          value={newFee.fee}
          onChange={handleInputChange} /><br/>
      <TextField id="standard-basic"style={{margin:"10px"}} label="Payment status:" variant="standard" type="text"
          name="payment"
          value={newFee.payment}
          onChange={handleInputChange}/><br/>

      
      
      <button style={{margin:"15px"}} onClick={addFee}>Add Student</button>
      {error?<p  style={{ color: 'red',marginLeft:"55px" }}>{error}</p>:null}
      {res?<p  style={{ color: 'red',marginLeft:"55px" }}>{res}</p>:null}


      </div>
      <h4>STUDENT LIST</h4>
      <BasicTable obj={obj}/>



      <div style={{display:'flex',backgroundColor:'lightblue',borderRadius:'15px',flexWrap:'wrap'}}>
        
      
      
      </div>
     
    </div>
  );
};


export default FeeManagement;
