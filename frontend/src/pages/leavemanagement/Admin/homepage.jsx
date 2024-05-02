// HomeLeave.jsx
import React from 'react';

import { Link } from 'react-router-dom';
import './HomeLeave.scss'; // Import your CSS file
import LeaveNav from './../../../Components/leave_management/LeaveNav';
import Greeting from './../../../Components/leave_management/Greeting';
import Calendar from './../../../Components/leave_management/calender';


export const HomeLeave = () => {
  return (
    <div className='content'>
      <div>
        <LeaveNav/>
       
      <Greeting/>
      <Link  Link to="/MyLeaves/:id" className='button'> Apply Leave</Link>

     <div className="box-container">
  <div className='box1'> 
    <h1 className='Lcount'>06</h1>
    <p className='Text'>Available Casual Leaves</p>
    <p className='taken'>01/07 taken</p>
  </div>

  <div className='box2'> 
    <h1 className='Lcount'>03</h1>
    <p className='Text'>Available Offical Leaves</p>
    <p className='taken'>02/05 taken</p>
  </div>

  <div className='box3'> 
    <h1 className='Lcount'>12</h1>
    <p className='Text'>Available Annual Leaves</p>
    <p className='taken'>02/14 taken</p>
  </div>
</div>

    <Calendar/>
    </div>
    </div>
  );
};

export default HomeLeave;
