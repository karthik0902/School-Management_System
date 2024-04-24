import React, { useState } from 'react';
import {AdminStudentPost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';


// Fee management component
const FeeManagement = ({obj}) => {
  const { code,setCode,Admintoken} = useContext(UserContext);

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
    console.log(newFee);
    const response= await AdminStudentPost(code,newFee,Admintoken)
    console.log(response);
  };



  return (
    <div>
    <div style={{margin:"20px",marginLeft:'2%',marginRight:'75%',backgroundColor:'white',padding:'30px',borderRadius:'20px'}}>
      <h2>Add student</h2>
      <TextField id="standard-basic" style={{margin:"15px"}}label="Student Id:" variant="standard" type="text"
          name="studentId"
          value={newFee.studentId}
          onChange={handleInputChange}/><br/>
      <TextField id="standard-basic" style={{margin:"15px"}} label="Amount:" variant="standard" type="number"
          name="fee"
          value={newFee.fee}
          onChange={handleInputChange} /><br/>
      <TextField id="standard-basic"style={{margin:"15px"}} label="Payment status:" variant="standard" type="text"
          name="payment"
          value={newFee.payment}
          onChange={handleInputChange}/><br/>

      
      
      <button style={{margin:"25px"}} onClick={addFee}>Add Student</button>
      </div>


      <div style={{display:'flex',backgroundColor:'white',borderRadius:'15px',flexWrap:'wrap'}}>
      {obj&&
          obj.map((obj)=>{
            return <div  style={{margin:"15px",marginLeft:"15px" ,display:'flex'}} >
                <p>
                Student Id  :      {obj.studentId}<br/>
                Amount:    {obj.fee}<br/>
                Payment status: {obj.payment}<br/>
      
                </p>
                
                
                </div>
          })
          
        }
      
      </div>
     
    </div>
  );
};


export default FeeManagement;
