import React, { useState } from 'react';
import {AdminPost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import EnhancedTable from './StaffList';



const StaffManagement = ({obj}) => {
    const { code,setCode,Admintoken} = useContext(UserContext);
    const token =localStorage.getItem('token')
    const [error,seterror]=useState(null)
    const [res,setres]=useState(null)



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
    const logincode= localStorage.getItem('logincode')//AdminToken
    const AdminToken= localStorage.getItem('AdminToken')//AdminToken

    try{
    const response= await AdminPost(logincode,newStaffMember,AdminToken)
    console.log(response);
    setres(response)

    }catch(error){
      seterror(error)
      
      console.log(error);
    }

  };


  return (
    <div style={{marginTop:'40px'}}>
    <div style={{margin:"20px",marginLeft:'2%',marginRight:'70%',backgroundColor:'lightblue',padding:'30px',borderRadius:'20px'}}>
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
      {res?<p  style={{ color: 'red',marginLeft:"55px" }}>{res}</p>:null}

      {error?<p>{error}</p>:null}
      </div>
      <h4>STAFF LIST</h4>
      <div style={{display:'flex',backgroundColor:'lightblue',borderRadius:'15px',flexWrap:'wrap'}}>
        <EnhancedTable obj={obj}/>
     
      
      </div>
    </div>
  );
};


export default StaffManagement;
