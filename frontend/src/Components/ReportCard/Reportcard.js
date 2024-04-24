import React, { useState } from 'react';
import { GetSutentlist } from "../../api";
import UserContext from '../../Components/UserContext/UserContext';
import { useContext } from 'react';
const ReportCard = () => {
    const [value, setValue] = useState('');
    const [data,setData]= useState()
    const { studenttoken} = useContext(UserContext);

    const search = async () => {
        try {
            const response = await GetSutentlist(value,studenttoken);
            setData(response);
          
        } catch (error) {
            console.error("Error fetching student data:", error);
      
        }
    };

    return (
        <div style={{ backgroundColor: 'white', margin: '1%', padding: '30px', borderRadius: '20px', marginRight: '80%' }} className="report-card">
            <h4>Search Report Card by Id</h4>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={search}>Search</button>
            {data&&
          data.map((obj)=>{
            return <div  style={{margin:"15px",marginLeft:"25px" ,display:'flex'}} >
                <p>
                  Student Id:   {obj.studentId}<br/>
                Subject :      {obj.sub}<br/>
                Grade: {obj.grade}<br/>
                Attendence:    {obj.attendence}<br/>
      
                </p>
                
                
                </div>
          })
          
        }

           
        </div>
    );
};

export default ReportCard;
