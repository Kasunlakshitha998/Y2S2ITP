import { Link, Outlet } from 'react-router-dom';
import AdminNav from '../../Components/Nav/adminNav';
import StockChart from '../../Components/Inventory_Management/MangeProduct/StockChart'

function Dashboard() {
  return (
    <div>
      <header>
        <AdminNav />
      </header>

      <main>
        <Link to="/admin/productsList">
          <button>ProductsList</button>
        </Link>
        <Outlet />
        

      </main>
    </div>
  );
}

export default Dashboard;
