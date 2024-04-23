import React, { useState } from 'react';
import "./Sidbar.scss";

import {
  FaFileAlt,
  FaUsers,
  FaUserCircle,
  FaCog,
  FaBell,
  FaBars
} from 'react-icons/fa';

import{
  TbLayoutDashboard,
  TbReportSearch,
}from 'react-icons/tb';

import{
  MdLogout
}from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export const Sidebar = ({children}) => {
  const[isOpen ,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  const menuItems=[
   {
    path:"/Dashboard",
    name:"Dashboard",
    icon: <TbLayoutDashboard />
   },

   {
    path:"/MyLeaves/:id",
    name:"My Leaves",
    icon: <FaFileAlt />
   },

   
   {
    path:"/MEmployees/:id",
    name:"Manage Leaves",
    icon: <FaUsers />
   },

   {
    path:"/Myprofile/:id",
    name:"My Profile",
    icon: <FaUserCircle />
   },

   {
    path:"/reports/:id",
    name:"Reports",
    icon: <TbReportSearch/>
   },

   {
    path:"/Settings",
    name:"Settings",
    icon: <FaCog />
   },

   {
    path:"/",
    name:"Log Out",
    icon: <MdLogout />
   },

  ]
  return (
    <div  className='container'> 
    <div style={{width: isOpen ? "200px" : "50px"}} className='sidebar'> 
   <div className ="top_section">
    <div style={{display: isOpen ? "block" : "none"}}  className='logo' >
    {/* <img src={companyLogo} alt="Company Logo" className="company-logo" /> */}
    <FaBell className="notification-icon" />
    </div>
    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
    <FaBars onClick={toggle}/>

    </div>
   </div>
   {
                   menuItems.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeClassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }

    </div>
    <main>{children}</main>
    </div>
  );
};
export default Sidebar;
