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
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import img from "../../asserts/teacher (1).png"

import {GetSchedule,GetSyllabus} from "../../api"
import ReportCard from '../../Components/Student/Reportcard';




const drawerWidth = 240;

export default function StudentAppbar() {
    const { logout} = useContext(UserContext);
    const { studenttoken } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [data2,setData1]=useState()
    const studentUser=localStorage.getItem('studentUser')
    const studentToken =localStorage.getItem('studentToken')
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetSchedule(studentToken,studentUser);

                setData(response.data);
              
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };

        fetchData(); 
    }, [studentToken,studentUser]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetSyllabus(studentToken,studentUser);
                
                setData1(response.data);
              
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };

        fetchData(); 
    }, [studentToken,studentUser]);


    

  


    const [value, setValue] = React.useState('1');
   



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar   sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <img src={img} style={{width:'45px',marginLeft:'5px'}} alt='img'/>
          <Typography style={{marginLeft:'20px'}} variant="h6" noWrap component="div">
          Student Page        </Typography>
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
                  
                  <ListItemText style={{textAlign:'left',marginLeft:'25px'}}  primary="Schedule" />
                </ListItemButton>
               
              </ListItem>
              
              <ListItemButton onClick={()=>setValue('2')} >
                  
                  <ListItemText style={{textAlign:'left',marginLeft:'25px'}} primary= "Syllabus"/>
                </ListItemButton>
                <ListItemButton onClick={()=>setValue('3')} >
                  
                  <ListItemText style={{textAlign:'left',marginLeft:'25px'}} primary= "Report Card"/>
                </ListItemButton>
               
            
          </List>
          <Divider />
         
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography paragraph>
        <TabContext value={value}>

        <TabPanel value="1">
        <h3 style={{marginTop:'4%'}}>Schedule</h3>

                    <div style={{backgroundColor:"white",padding:'10px',borderRadius:'20px',margin:'1%'}}>

                {data?
             <div  style={{margin:"10px",marginLeft:"15px"}} >
                 <TableContainer sx={{ borderRadius: '20px' ,width:'710px', backgroundColor: 'lightblue'}} component={Paper}>
      <Table sx={{ minWidth: '650px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">SUBJECT</TableCell>
            <TableCell align="left">TIME</TableCell>

          </TableRow>
        </TableHead>
        {data?data.map((row)=>{ 

return  <TableBody key={row._id}>

            <TableRow
              key={row.studentId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sub}
              </TableCell>
              <TableCell align="left">{row.time}</TableCell>

            </TableRow>
                    </TableBody>}) :null}


      </Table>
    </TableContainer>
               
                
                </div>
          :null}
          

            </div>
                    </TabPanel>
                    <TabPanel value="2">
        <h3 style={{marginTop:'4%'}}>Syllabus</h3>

                    <div style={{backgroundColor:"white",padding:'10px',borderRadius:'20px',margin:'1%'}}>

                {data2?
             <div  style={{margin:"10px",marginLeft:"15px"}} >
                 <TableContainer sx={{ borderRadius: '20px' ,width:'710px', backgroundColor: 'lightblue'}} component={Paper}>
      <Table sx={{ minWidth: '650px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">SUBJECT</TableCell>
            <TableCell align="left">SYLLABUS</TableCell>

          </TableRow>
        </TableHead>
        {data2?data2.map((row)=>{ 

return  <TableBody key={row.studentId}>

            <TableRow
              key={row.studentId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sub}
              </TableCell>
              <TableCell align="left">{row.Syllabus}</TableCell>

            </TableRow>
                    </TableBody>}) :null}


      </Table>
    </TableContainer>
               
                
                </div>
          :null}
          

            </div>
                    </TabPanel>
<TabPanel value="3">  <ReportCard/></TabPanel>



</TabContext>
        </Typography>
        
      </Box>

    </Box>
  );
}



