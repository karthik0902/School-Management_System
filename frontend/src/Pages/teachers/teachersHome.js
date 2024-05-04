import React, { useState, useEffect, useContext } from 'react';

import { GetTeachersData } from '../../api';
import UserContext from '../../Components/UserContext/UserContext';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TeacherAppbar from './teacherAppBar';

const TeachersHomePage = () => {

    return (
        <div className="teacher-home-page" style={{overflowX:'auto'}}>
            <TeacherAppbar/>
           
                   
        </div>
    );
};

export default TeachersHomePage;
