import React from 'react';
import './HomeLeave.scss';
import StaffNav from '../../Components/Nav/staffnav';


import Greeting from './../../Components/leave_management/Greeting';
import Calendar from './../../Components/leave_management/calender';



export const HomePageS = () => {
  return (
    <div className="content max-w-7xl ml-48">
      <div>
        <StaffNav />
        <Greeting />

        <div className="box-container">
          <div className="box1">
            <h1 className="Lcount">06</h1>
            <p className="Text">Available Casual Leaves</p>
            <p className="taken">01/07 taken</p>
          </div>

          <div className="box2">
            <h1 className="Lcount">03</h1>
            <p className="Text">Available Offical Leaves</p>
            <p className="taken">02/05 taken</p>
          </div>

          <div className="box3">
            <h1 className="Lcount">12</h1>
            <p className="Text">Available Annual Leaves</p>
            <p className="taken">02/14 taken</p>
          </div>
        </div>
        <div className="mt-5" >
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default HomePageS;