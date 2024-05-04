
import React,{useEffect,useState} from 'react';
import StaffManagement from '../../Components/admin/StaffManagement';
import FeeManagement from '../../Components/admin/FeeManagement';
import {GetAdminData,GetAmount} from "../../api"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import ResponsiveAppBar from './app bar';



const AdminHomePage = () => {
    const { Admintoken} = useContext(UserContext);
    const [value, setValue] = React.useState('1');
    const [data, setData] = useState();
    const [Amount, setAmount] = useState();
    const AdminToken= localStorage.getItem('AdminToken')//AdminToken
    const logincode = localStorage.getItem('logincode')//AdminToken

    const [students, setStudents] = useState();
    const [teachers, setTeachers] = useState();


  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetAdminData(AdminToken,logincode);
                setData(response.data);
                setStudents(response.data.students)
                setTeachers(response.data.teachers)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [AdminToken,logincode]);
   

  
    



    return (
        <div className="student-home-page">
            <ResponsiveAppBar data={{ teachers: teachers, students: students }} />

        </div>
    );
};

export default AdminHomePage;
