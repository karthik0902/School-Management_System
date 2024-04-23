
import React from 'react';
import Schedule from '../../Components/Schedule/Schedule';
import Syllabus from '../../Components/Syllabus/Syllabus';
import PerformanceTracker from '../../Components/PerformanceTracker/PerformanceTracker';
import Gradebook from '../../Components/Gradebook/Gradebook';
import ReportCard from '../../Components/ReportCard/Reportcard';

const TeachersHomePage = () => {
    return (
        <div className="student-home-page">
            <h2>Welcome to Teacher Home Page</h2>
            <Schedule/>
            <Syllabus/>
            <PerformanceTracker/>
       
            

        </div>
    );
};

export default TeachersHomePage;
