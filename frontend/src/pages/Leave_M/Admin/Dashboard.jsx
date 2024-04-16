import React from 'react'
import Sidebar from '../../../Components/Leave_Management/Admin/Sidebar';
import Greeting from '../../../Components/Leave_Management/Admin/Greeting';
import "./Box.scss"
import { Link } from 'react-router-dom';

export const LDashboard = () => {
  return (
   

    <div>
      <Greeting/>

     <Sidebar/>

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


    </div>

  
  )
}
export default LDashboard;
