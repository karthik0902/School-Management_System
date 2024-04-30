import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import {GetAmount} from "../../api"
import img from "../../asserts/teacher (1).png"
import { GetTeachersData } from '../../api';
import Schedule from '../../Components/Teacher/Schedule';
import Syllabus from '../../Components/Teacher/Syllabus';
import PerformanceTracker from '../../Components/Teacher/PerformanceTracker';
import Gradebook from '../../Components/Teacher/Gradebook';



const drawerWidth = 240;

export default function TeacherAppbar() {
    const { logout} = useContext(UserContext);

    // const AdminToken= localStorage.getItem('AdminToken')//AdminToken
    const [students, setStudents] = useState();
    const [data, setdata] = useState();

    const [syllabus, setSyllabus] = useState();
    const [schedule, setSchedule] = useState();
    const { teachertoken ,} = useContext(UserContext);
    const empid=localStorage.getItem('empid')
    const teacherToken=localStorage.getItem('teacherToken')



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetTeachersData(empid,teacherToken);
                setdata(response.data)
                setStudents(response.data.student);
                setSyllabus(response.data.Syllabus);
                setSchedule(response.data.Schedule);
            
                
               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const [value, setValue] = React.useState('1');
   



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar   sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <img src={img} style={{width:'45px',marginLeft:'5px'}}/>
          <Typography style={{marginLeft:'20px'}} variant="h6" noWrap component="div">
          Teacher Page        </Typography>
          <Box sx={{ flexGrow: 1 }} /> {/* Add a flex-grow box to push the Button to the right */}
      <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
       
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        
        <Box sx={{ overflow: 'auto' }}>
          <List style={{marginTop:'80px',marginBottom:'10px',textAlign:'center'}}>
              <ListItem  disablePadding>
                <ListItemButton onClick={()=>setValue('1')} >
                  
                  <ListItemText style={{textAlign:'left',marginLeft:'25px'}}  primary="Performance Tracker" />
                </ListItemButton>
               
              </ListItem>
              
              <ListItemButton onClick={()=>setValue('2')} >
                  
                  <ListItemText style={{textAlign:'left',marginLeft:'25px'}} primary= "Schedule"/>
                </ListItemButton>
                <ListItemButton onClick={()=>setValue('3')} >
                  
                  <ListItemText style={{textAlign:'left',marginLeft:'25px'}} primary= "Syllabus"/>
                </ListItemButton>
                <ListItemButton onClick={()=>setValue('4')} >
                  
                  <ListItemText style={{textAlign:'left',marginLeft:'25px'}} primary= "Gradebook"/>
                </ListItemButton>
            
          </List>
          <Divider />
         
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography paragraph>
        <TabContext value={value}>

<TabPanel value="1"><PerformanceTracker /></TabPanel>
<TabPanel value="2"><Schedule obj={schedule} /></TabPanel>
<TabPanel value="3">  < Syllabus obj={syllabus}  /></TabPanel>
<TabPanel value="4">  <Gradebook obj={students} /></TabPanel>



</TabContext>
        </Typography>
        
      </Box>

    </Box>
  );
}



