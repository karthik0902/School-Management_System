import React from 'react';

const ReportCard = ({ obj} ) => {
    return (
        <div style={{backgroundColor:'white',margin:'1%',padding:'10px',borderRadius:'20px',marginRight:'80%'}} className="report-card">
            <h2>Report Card</h2>
            {console.log(obj.sub)}
            {console.log(obj)}

            <div className="subjects">
                
                    <div  className="subject">

                        <h3>{obj.studentId}</h3>
                        <p>subject: {obj.sub}</p>
                        <p>Grade: {obj.grade}</p>
                        <p>Attendance: {obj.attendence}%</p>
                    </div>
           
            </div> 
        </div>
    );
};

export default ReportCard;