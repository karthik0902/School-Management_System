import React, { useState } from 'react';


const Gradebook = () => {
    const [grades, setGrades] = useState([]);
  
    const addGrade = (subject, grade) => {
      setGrades([...grades, { subject, grade }]);
    };
  
    const calculateGPA = () => {
      const totalGrades = grades.length;
      let totalPoints = 0;
      grades.forEach((grade) => {
        switch (grade.grade) {
          case 'A':
            totalPoints += 4;
            break;
          case 'B':
            totalPoints += 3;
            break;
          case 'C':
            totalPoints += 2;
            break;
          case 'D':
            totalPoints += 1;
            break;
          default:
            totalPoints += 0;
        }
      });
      const gpa = totalPoints / totalGrades;
      return gpa.toFixed(2);
    };
  
    return (
      <div>
        <h2>Gradebook</h2>
        <button onClick={() => addGrade("Math", "A")}>Add Math Grade</button>
        <button onClick={() => addGrade("Science", "B")}>Add Science Grade</button>
        <ul>
          {grades.map((grade, index) => (
            <li key={index}>
              {grade.subject}: {grade.grade}
            </li>
          ))}
        </ul>
        <p>GPA: {calculateGPA()}</p>
      </div>
    );
  };
  export default Gradebook