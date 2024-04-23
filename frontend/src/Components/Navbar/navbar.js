import React from 'react'
import {NavLink, Outlet} from 'react-router-dom';
import classes from "./navbar.css"
import {useState,useEffect} from 'react'
import axios from 'axios'

function Navbar() {

   
    
  return (
    <div >
      <div className='nav'>
        <NavLink className="link" to="login">Admin</NavLink> &nbsp;
        <NavLink className="link" to="parents">Parents</NavLink> &nbsp;
        

        </div>
        <Outlet/>


    </div>
  )
}

export default Navbar