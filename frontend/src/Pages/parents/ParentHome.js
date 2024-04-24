import React,{useEffect,useState} from 'react';
import {GetSutentlist,GetSyllabus} from "../../api"
import ReportCard from '../../Components/ReportCard/Reportcard';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';




const ParentHomePage = () => {
    const { parenttoken } = useContext(UserContext);

    const [data,setData]=useState()
    const [data2,setData1]=useState()
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetSyllabus(parenttoken);
                
                setData1(response.data);
              
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error state
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, []);







    return (
        <div className="student-home-page">
            <h2>Welcome to Parents Home Page</h2>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Report Card" value="1" />
                            <Tab label="Syllabus" value="2" />
                          
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <ReportCard />
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
                    
                </TabContext>
            </Box>

           
      

     
            
            
        </div>
    );
};

export default ParentHomePage;
