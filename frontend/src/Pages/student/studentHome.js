
import React, { useState, useEffect } from 'react';
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
import {GetSchedule,GetSyllabus} from "../../api"


const StudentHomePage = () => {
    const [data, setData] = useState([]);
    const [data2,setData1]=useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetSchedule();

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
                const response = await GetSyllabus();
                
                setData1(response.data);
              
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };

        fetchData(); 
    }, []);







    return (
        <div className="student-home-page">
            <h2>Welcome to Student Home Page</h2>
            <div style={{backgroundColor:"white",padding:'10px',borderRadius:'20px',margin:'1%'}}>
                <h3>Schedule</h3>

                {data[0]&&
          data[0].map((obj)=>{
            return <div  style={{margin:"10px",marginLeft:"15px"}} >
                <p>
                Subject  :      {obj.sub}<br/>
                Time:    {obj.time}<br/>
      
                </p>
                
                
                </div>
          })
          
        }

            </div>
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

        </div>
    );
};

export default StudentHomePage;
