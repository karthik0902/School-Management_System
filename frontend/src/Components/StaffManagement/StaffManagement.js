import React, { useState } from 'react';
import {AdminPost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';



const StaffManagement = ({obj}) => {
    const { code,setCode,Admintoken} = useContext(UserContext);
    const token =localStorage.getItem('token')

  const [newStaffMember, setNewStaffMember] = useState({
    name: '',
    role: '',
    empid:'',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaffMember({
      ...newStaffMember,
      [name]: value
    });
    
  };

  const addStaffMember = async () => {
    
    setNewStaffMember({ name: '', role: '' ,empid:''});
    console.log(newStaffMember);
    const response= await AdminPost(code,newStaffMember,Admintoken)
    console.log(response);

  };


  return (
    <div>
    <div style={{margin:"20px",marginLeft:'2%',marginRight:'75%',backgroundColor:'white',padding:'30px',borderRadius:'20px'}}>
      <h2>Staff Management</h2>
      <TextField id="standard-basic" style={{margin:"10px"}} label="Name:" variant="standard" type="text"
          name="name"
          value={newStaffMember.name}
          onChange={handleInputChange} /><br/>
      <TextField id="standard-basic" style={{margin:"10px"}} label="EMP ID:" variant="standard" type="text"
          name="empid"
          value={newStaffMember.empid}
          onChange={handleInputChange} /><br/>
      <TextField id="standard-basic" style={{margin:"10px"}} label="Role:" variant="standard"  type="text"
          name="role"
          value={newStaffMember.role}
          onChange={handleInputChange}/><br/>
   
      <button style={{margin:"15px"}} onClick={addStaffMember}>Add Staff Member</button>
      </div>
      <div style={{display:'flex',backgroundColor:'white',borderRadius:'15px',flexWrap:'wrap'}}>
      {obj&&
          obj.map((obj)=>{
            return <div  style={{margin:"15px",marginLeft:"15px" ,display:'flex'}} >
                <p>
                Emp ID  :      {obj.empid}<br/>
                name:    {obj.name}<br/>
                Role: {obj.role}<br/>
      
                </p>
                
                
                </div>
          })
          
        }
      
      </div>
    </div>
  );
};


export default StaffManagement;
