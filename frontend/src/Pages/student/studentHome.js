
import React, { useState, useEffect } from 'react';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import {GetSchedule,GetSyllabus} from "../../api"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ReportCard from '../../Components/Student/Reportcard';
import StudentAppbar from './studentAppbar';



const StudentHomePage = () => {

    return (
        <div className="student-home-page">
            <StudentAppbar/>    

        </div>
    );
};

export default StudentHomePage;
