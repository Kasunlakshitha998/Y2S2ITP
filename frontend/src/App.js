import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/User/HomePage';
import ProductPage from './pages/User/ProductPage';
import Dashboard from './pages/Admin/Dashboard';
import ProductsList from './Components/Inventory_Management/MangeProduct/ProductsList';
import AddProduct from './Components/Inventory_Management/MangeProduct/AddProduct';
import EditProduct from './Components/Inventory_Management/MangeProduct/EditProduct';

function App() {
  return (
    <div> 
        <Routes>          
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/admin/" element={<Dashboard />} />
          <Route path="/admin/productsList" element={<ProductsList />} />  
          <Route path="/admin/productsList/addProduct" element={<AddProduct />} />
          <Route path="/admin/productsList/editProduct" element={<EditProduct />} />
        </Routes>
    </div>
  );
}

export default App;
