import React, { useState } from 'react';
import {AdminPost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';


// Staff management component
const StaffManagement = () => {
    const { code,setCode} = useContext(UserContext);

  const [staff, setStaff] = useState([]);
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
    setStaff([...staff, newStaffMember]);
    setNewStaffMember({ name: '', role: '' ,empid:''});
    console.log(newStaffMember);
    const response= await AdminPost(code,newStaffMember)
    console.log(response);

  };

  return (
    <div style={{margin:"20px"}}>
      <h2>Staff Management</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newStaffMember.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>EMP ID:</label>
        <input
          type="text"
          name="empid"
          value={newStaffMember.empid}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={newStaffMember.role}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={addStaffMember}>Add Staff Member</button>
      <ul>
        {staff.map((staffMember, index) => (
          <li key={index}>
            <strong>{staffMember.name}</strong> - {staffMember.role}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default StaffManagement;
