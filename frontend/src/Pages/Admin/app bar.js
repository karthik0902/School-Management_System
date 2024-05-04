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
import StaffManagement from '../../Components/admin/StaffManagement';
import FeeManagement from '../../Components/admin/FeeManagement';
import {GetAmount} from "../../api"
import img from "../../asserts/user-gear.png"


const drawerWidth = 240;

export default function ClippedDrawer({data}) {
    const { Admintoken,logout} = useContext(UserContext);
    const AdminToken= localStorage.getItem('AdminToken')//AdminToken


    const { teachers, students } = data;
    const [value, setValue] = React.useState('1');
    const [Amount, setAmount] = React.useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetAmount(AdminToken);
                setAmount(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [AdminToken]);



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar   sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <img src={img} style={{width:'40px',marginLeft:'5px'}} alt='img'/>
          <Typography style={{marginLeft:'20px'}}  >
          Admin Page        </Typography>
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
                  
                  <ListItemText style={{textAlign:'center'}}  primary="Staff Management" />
                </ListItemButton>
               
              </ListItem>
              <ListItemButton onClick={()=>setValue('2')} >
                  
                  <ListItemText style={{textAlign:'center'}} primary= "Fee Management"/>
                </ListItemButton>
            
          </List>
          <Divider />
         
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography paragraph>
        <TabContext value={value}>

<TabPanel value="1"><StaffManagement obj={teachers}/></TabPanel>
<TabPanel value="2"><FeeManagement obj={students}/></TabPanel>
{Amount?<p style={{margin:'1%',marginLeft:'35px'}}>Total Amount collected :{Amount}</p>:null}


</TabContext>
        </Typography>
        
      </Box>

    </Box>
  );
}



