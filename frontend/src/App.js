import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/User/HomePage';
import ProductPage from './pages/User/ProductPage';
import Dashboard from './pages/Admin/Dashboard';
import ProductsList from './Components/Inventory_Management/MangeProduct/ProductsList';
import AddProduct from './Components/Inventory_Management/MangeProduct/AddProduct';
import EditProduct from './Components/Inventory_Management/MangeProduct/EditProduct';
import Sidebar from './Components/Leave_Management/Admin/Sidebar';
import LDashboard from "./pages/Leave_M/Admin/Dashboard";
import MEmployees from "./pages/Leave_M/Admin/MEmployees"
import MyLeaves from './pages/Leave_M/Admin/MyLeaves';
import Myprofile from './pages/Leave_M/Admin/Myprofile';
import Reports from './pages/Leave_M/Admin/reports'; // Corrected import
import Settings from './pages/Leave_M/Admin/Settings';

function App() {
  return (
    <div> 
      <Routes>          
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/admin/productsList" element={<ProductsList />} />  
        <Route path="/admin/productsList/addProduct" element={<AddProduct />} />
        <Route path="/admin/productsList/editProduct/:id" element={<EditProduct />} />
        
        <Route path="/Sidebar" element={<Sidebar> {/* Sidebar content */} </Sidebar>} /> {/* Add Sidebar route */}

        <Route path="/Dashboard"  element={<LDashboard />} />
        <Route path="/MyLeaves/:id"  element={<MyLeaves />} /> {/* Corrected path */}
        <Route path="/MEmployees/id"  element={<MEmployees />} />
        <Route path="/Myprofile/:id"  element={<Myprofile />} /> {/* Corrected path */}
        <Route path="/reports/:id"  element={<Reports />} /> {/* Corrected path */}
        <Route path="/Settings"  element={<Settings />} />,.
      </Routes>
    </div>
  );
}

export default App;
