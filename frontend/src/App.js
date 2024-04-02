import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/User/HomePage';
import ProductPage from './pages/User/ProductPage';
import Dashboard from './pages/Admin/Dashboard';
import ProductsList from './Components/Inventory_Management/MangeProduct/ProductsList';
import AddProduct from './Components/Inventory_Management/MangeProduct/AddProduct';
import EditProduct from './Components/Inventory_Management/MangeProduct/EditProduct';


import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Components/User_Management/signup';
import Login from './Components/User_Management/Login';
import ForgotPassword from './Components/User_Management/ForgotPassword';
import CreateUsers from './Components/User_Management/Create';
import Users from './Components/User_Management/Detail';
import UpdateUsers from './Components/User_Management/updateuser';
import ResetPassword from './Components/User_Management/ResetPassword';
import OTPVerification from './Components/User_Management/OTPVerification';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/admin/productsList" element={<ProductsList />} />
        <Route path="/admin/productsList/addProduct" element={<AddProduct />} />
        <Route
          path="/admin/productsList/editProduct/:id"
          element={<EditProduct />}
        />

        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/userdetails" element={<Users />} /> 
        <Route path="/usercreate" element={<CreateUsers />} />
        <Route path="/userupdate/:id" element={<UpdateUsers />} />
      </Routes>
    </div>
  );
}

export default App;
