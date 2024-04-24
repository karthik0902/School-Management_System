import React, { useState, useEffect, useContext } from 'react';
import ScheduleComponent from '../../Components/Schedule/Schedule';
import SyllabusComponent from '../../Components/Syllabus/Syllabus';
import PerformanceTracker from '../../Components/PerformanceTracker/PerformanceTracker';
import { GetTeachersData } from '../../api';
import UserContext from '../../Components/UserContext/UserContext';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Gradebook from '../../Components/Gradebook/Gradebook';

const TeachersHomePage = () => {
    const [value, setValue] = useState('1');
    const [students, setStudents] = useState();
    const [data, setdata] = useState();

    const [syllabus, setSyllabus] = useState();
    const [schedule, setSchedule] = useState();
    const { teachertoken } = useContext(UserContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetTeachersData(teachertoken);
                setdata(response.data)
            
                
               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (data) {
            data.forEach((student, index) => {
                setStudents(student.student);
                setSyllabus(student.Syllabus);
                setSchedule(student.Schedule);})
            }
    }, [data]);


    return (
        <div className="teacher-home-page">
            <h2>Welcome to Teacher Home Page</h2>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Schedule" value="1" />
                            <Tab label="Syllabus" value="2" />
                            <Tab label="Performance Tracker" value="3" />
                            <Tab label="Gradebook " value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <ScheduleComponent obj={schedule} />
                    </TabPanel>
                    <TabPanel value="2">
                        <SyllabusComponent obj={syllabus} />
                    </TabPanel>
                    <TabPanel value="3">
                        <PerformanceTracker  />
                    </TabPanel>
                    <TabPanel value="4">
                        <Gradebook obj={students} />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default TeachersHomePage;
