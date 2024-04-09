import {Outlet } from 'react-router-dom';
import AdminNav from '../../Components/Nav/adminNav';
import "./dash.css"


function Dashboard() {
  return (
    <div>
      <header>
        <AdminNav />
      </header>

      <main className='main'>
        <Outlet />
        

      </main>
    </div>
  );
}

export default Dashboard;
