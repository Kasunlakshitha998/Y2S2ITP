import { Link, Outlet } from 'react-router-dom';
import AdminNav from '../../Components/Nav/adminNav';
import "./dash.css"
import StockChart from '../../Components/Inventory_Management/MangeProduct/StockChart'

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
