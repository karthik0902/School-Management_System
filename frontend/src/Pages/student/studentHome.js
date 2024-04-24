
import React, { useState, useEffect } from 'react';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import {GetSchedule,GetSyllabus} from "../../api"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ReportCard from '../../Components/ReportCard/Reportcard';


const StudentHomePage = () => {
    const { studenttoken } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [value, setValue] = useState('1');
    const [data2,setData1]=useState()
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetSchedule(studenttoken);

                setData(response.data);
              
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };

        fetchData(); 
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetSyllabus(studenttoken);
                
                setData1(response.data);
              
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };

        fetchData(); 
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };







    return (
        <div className="student-home-page">
            <h2>Welcome to Student Home Page</h2>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList  onChange={handleChange} aria-label="lab API tabs example">
                            <Tab  label="Schedule" value="1" />
                            <Tab label="Syllabus" value="2" />
                            <Tab label="Report Card" value="3" />
                   
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                    <div style={{backgroundColor:"white",padding:'10px',borderRadius:'20px',margin:'1%'}}>
                <h3>Schedule</h3>

                {data[0]?
          data[0].map((obj)=>{
            return <div  style={{margin:"10px",marginLeft:"15px"}} >
                <p>
                Subject  :      {obj.sub}<br/>
                Time:    {obj.time}<br/>
      
                </p>
                
                
                </div>
          })
          
        :null}

            </div>
                    </TabPanel>
                    <TabPanel value="2">
                    <div style={{backgroundColor:"white",padding:'10px',borderRadius:'20px',margin:'1%'}}>
                <h3>Syllabus</h3>

                {data2&&
          data2[0].map((obj)=>{
            return <div  style={{margin:"10px",marginLeft:"15px"}} >
                <p>
                Subject  :      {obj.sub}<br/>
                Syllabus:    {obj.Syllabus}<br/>
      
                </p>
                
                
                </div>
          })
          
        }

            </div>
                    </TabPanel>
                    <TabPanel value="3">
                        <ReportCard/>
                      
                    </TabPanel>
                    
                </TabContext>
            </Box>
            
            

        </div>
    );
};

export default StudentHomePage;
