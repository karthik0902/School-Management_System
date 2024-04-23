

import React,{useEffect,useState} from 'react';
import {GetSutentlist,GetSyllabus} from "../../api"
import ReportCard from '../../Components/ReportCard/Reportcard';




const ParentHomePage = () => {
    const [data,setData]=useState()
    const [data2,setData1]=useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetSutentlist();
                setData(response);
                console.log(response);
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
                // Handle error state
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, []);

console.log(data);





    return (
        <div className="student-home-page">
            <h2>Welcome to Parents Home Page</h2>

           
        {data?<ReportCard obj= {data[0][1]}/>:null}

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

export default ParentHomePage;
