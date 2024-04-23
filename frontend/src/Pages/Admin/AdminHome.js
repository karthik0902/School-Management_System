
import React,{useEffect,useState} from 'react';
import StaffManagement from '../../Components/StaffManagement/StaffManagement';
import FeeManagement from '../../Components/AddStudent/FeeManagement';
import {GetData} from "../../api"



const AdminHomePage = () => {
    



    return (
        <div className="student-home-page">
            <h2>Welcome to Admin Home Page</h2>
            <StaffManagement/>
            <FeeManagement/>
          
           

        </div>
    );
};

export default AdminHomePage;
