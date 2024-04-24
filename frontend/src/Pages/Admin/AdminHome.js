
import React,{useEffect,useState} from 'react';
import StaffManagement from '../../Components/StaffManagement/StaffManagement';
import FeeManagement from '../../Components/AddStudent/FeeManagement';
import {GetAdminData,GetAmount} from "../../api"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';



const AdminHomePage = () => {
    const { Admintoken} = useContext(UserContext);
    const [value, setValue] = React.useState('1');
    const [data, setData] = useState();
    const [Amount, setAmount] = useState();

    const [students, setStudents] = useState();
    const [teachers, setTeachers] = useState();


  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetAdminData(Admintoken);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (data) {
            data.forEach((student, index) => {
                setStudents(student.students);
                setTeachers(student.teachers);
            });
        }
    }, [data]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetAmount(Admintoken);
                setAmount(response.data);
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
            <h2>Welcome to Admin Home Page</h2>
            <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
          
            <Tab label="Staff Management"   value="1" />
            <Tab label="Fee Management" value="2" />
            
          </TabList>
        </Box>
        <TabPanel value="1"><StaffManagement obj={teachers}/></TabPanel>
        <TabPanel value="2"><FeeManagement obj={students}/></TabPanel>
        
      </TabContext>
    </Box>
            
          
           {Amount?<p style={{margin:'1%',marginLeft:'35px'}}>Total Amount collected :{Amount}</p>:null}

        </div>
    );
};

export default AdminHomePage;
