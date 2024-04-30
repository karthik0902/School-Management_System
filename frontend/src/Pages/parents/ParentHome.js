import React,{useEffect,useState} from 'react';
import {GetSutentlist,GetSyllabus} from "../../api"
import ReportCard from '../../Components/Parents/Reportcard';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
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
import img from "../../asserts/teacher (1).png"



const drawerWidth = 240;


const ParentHomePage = () => {
    const { parenttoken,logout } = useContext(UserContext);

   
    const [value, setValue] = useState('1');
 

    
   




    return (
        <div >
             <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar   sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <img src={img} style={{width:'45px',marginLeft:'5px'}} alt='img'/>
          <Typography style={{marginLeft:'20px'}} variant="h6" noWrap component="div">
          Parent Page        </Typography>
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
                  
                  <ListItemText style={{textAlign:'left',marginLeft:'25px'}}  primary="Report Card" />
                </ListItemButton>
               
              </ListItem>
              
              {/* <ListItemButton onClick={()=>setValue('2')} >
                  
                  <ListItemText style={{textAlign:'left',marginLeft:'25px'}} primary= "Schedule"/>
                </ListItemButton> */}
               
            
          </List>
          <Divider />
         
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography paragraph>
        <TabContext value={value}>

<TabPanel value="1">  <ReportCard /></TabPanel>



</TabContext>
        </Typography>
        
      </Box>

    </Box>
           
                

           
      

     
            
            
        </div>
    );
};

export default ParentHomePage;
