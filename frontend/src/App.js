import './App.css';
import {  useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import UserContext from './Components/UserContext/UserContext'
import GetStartedPage from './Pages/Getstarted';
import ChooseLoginTypePage from './Pages/choose';
import StudentAuthPage from './Pages/student/studentLogin';
import StudentHomePage from './Pages/student/studentHome';
import TeachersHomePage from './Pages/teachers/teachersHome';
import TeachersAuthPage from './Pages/teachers/teachersLogin';
import ParentAuthPage from './Pages/parents/parentLogin';
import AdminAuthPage from './Pages/Admin/AdminLogin';
import AdminHomePage from './Pages/Admin/AdminHome';
import NotFound from './Pages/pageNotfound';
import ParentHomePage from './Pages/parents/ParentHome';
import SignUpSignInForm from './Components/login/login'


function App() {
  let [code,setCode]=useState()
  let [empid,setEmpid]=useState()
  const [teachertoken,setToken]=useState()
  const [Admintoken,setAdminToken]=useState()
  const [studenttoken,setstudentToken]=useState()
  const [parenttoken,setparentToken]=useState()




  


  





  const nav = useNavigate();
  const back=()=>{
    nav('/')  

  }


  const logout=()=>{
    

    nav('/choose')

    localStorage.setItem("studentlogin",false)
    localStorage.setItem("adminlogin",false)
    localStorage.setItem("teacherlogin",false)
    localStorage.setItem("parentlogin",false)
  }

 
const studentlogin=localStorage.getItem("studentlogin")    
const adminlogin=localStorage.getItem("adminlogin")   
const teacherlogin=localStorage.getItem("teacherlogin")   
const parentlogin=localStorage.getItem("parentlogin")   
// console.log('a'+adminlogin);
// console.log('t'+teacherlogin);
// console.log('s'+studentlogin);console.log('p'+parentlogin);




const renderRoutes = () => {
  if (studentlogin === "true") {
    return <Route path="/studenthome" element={<StudentHomePage />} />;
  } else if (teacherlogin === "true") {
    return <Route path="/teacherhome" element={<TeachersHomePage />} />;
  } else if (adminlogin === "true") {
    return <Route path="/adminhome" element={<AdminHomePage />} />;
  } else if (parentlogin === "true") {
    return <Route path="/home" element={<ParentHomePage />} />;
  } else {
    // If none of the above conditions are met, you can return a default route or handle the case where no user is logged in
    return null;
  }
};

  // const renderRoutes = () => {
  //   if (studentlogin === "true") {
  //     return <Route path='/studenthome' element={<StudentHomePage />} />;
  //   } 
  //   if (teacherlogin === "true") {
  //     return <Route path='/teacherhome' element={<TeachersHomePage />} />;
  //   } 
    
  //    if (adminlogin === "true") {
  //     return <Route path='/adminhome' element={<AdminHomePage />} />;
  //   }
  //    if (parentlogin === "true") {
  //     return <Route path='/home' element={<ParentHomePage />} />;
  //   } 
  // };
  



  return (
    <div>
      <UserContext.Provider value={{ code,setCode ,empid,setEmpid,teachertoken,setToken,
      Admintoken,setAdminToken,studenttoken,setstudentToken,parenttoken,setparentToken,logout}}>
  
        <Routes>
          <Route path="/" element={<GetStartedPage />} />
          <Route path="/choose" element={<ChooseLoginTypePage />} />
          <Route path="/student" element={<StudentAuthPage/>}/>
          <Route path="/teacher" element={<TeachersAuthPage/>}/>
          <Route path="/parent" element={<ParentAuthPage/>}/>
          <Route path="/login" element={<SignUpSignInForm/>}/>
          <Route path="/admin" element={<AdminAuthPage/>}/>
          <Route path="*" element={<NotFound/>}/>
         




          {renderRoutes()}
        </Routes>
       

      </UserContext.Provider>
    </div>
  );
}

export default App;
