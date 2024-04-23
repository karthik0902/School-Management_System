import React, { useState } from 'react';
import {AdminStudentPost} from "../../api"
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';


// Fee management component
const FeeManagement = () => {
  const { code,setCode} = useContext(UserContext);

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
    const response= await AdminStudentPost(code,newFee)
    console.log(response);
  };



  return (
    <div style={{margin:"20px"}}>
      <h2>Add student</h2>
      <div>
        <label>Student Id:</label>
        <input
          type="text"
          name="studentId"
          value={newFee.studentId}
          onChange={handleInputChange}
        />
      </div>
     
      <div>
        <label>Amount:</label>
        <input
          type="number"
          name="fee"
          value={newFee.fee}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Payment status:</label>
        <input
          type="text"
          name="payment"
          value={newFee.payment}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={addFee}>Add Student</button>
     
    </div>
  );
};


export default FeeManagement;
