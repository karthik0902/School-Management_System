import './App.css';
import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar';
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


function App() {
  let [login,setlogin]=useState(false)
  let [tlogin,setteacherslogin]=useState(false)
  let [plogin,setParentslogin]=useState(false)
  let [Alogin,setAdminlogin]=useState(false)
  let [code,setCode]=useState()
  let [empid,setEmpid]=useState()
  let [teachertoken,setToken]=useState()






  const nav = useNavigate();
  const back=()=>{
    

    nav('/')
    setlogin(false)
    setteacherslogin(false)
    setParentslogin(false)
    setAdminlogin(false)

  }


  const logout=()=>{
    

    nav('/choose')
    setlogin(false)
    setteacherslogin(false)
    setParentslogin(false)
    setAdminlogin(false)

  }

  const renderRoutes = () => {
    if (login) {
      return <Route path='/studenthome' element={<StudentHomePage />} />;
    } 
     if (tlogin) {
      return <Route path='/teacherhome' element={<TeachersHomePage />} />;
    } 
     if (Alogin) {
      return <Route path='/adminhome' element={<AdminHomePage />} />;
    }
     if (plogin) {
      return <Route path='/home' element={<ParentHomePage />} />;
    } 
  };
  



  return (
    <div>
      <UserContext.Provider value={{ login,setlogin,setteacherslogin,setAdminlogin,code,setCode ,empid,setEmpid,teachertoken,setToken,plogin,setParentslogin}}>
  
        <Routes>
          <Route path="/" element={<GetStartedPage />} />
          <Route path="/choose" element={<ChooseLoginTypePage />} />
          <Route path="/student" element={<StudentAuthPage/>}/>
          <Route path="/teacher" element={<TeachersAuthPage/>}/>
          <Route path="/parent" element={<ParentAuthPage/>}/>
          <Route path="/admin" element={<AdminAuthPage/>}/>
          <Route path="*" element={<NotFound/>}/>
         




          {renderRoutes()}
        </Routes>
        <button style={{margin:'1%'}} onClick={logout}>Logout</button>
        <button style={{margin:'1%'}} onClick={back}>Back</button>

      </UserContext.Provider>
    </div>
  );
}

export default App;
