import { Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/User/HomePage';
import ProductPage from './pages/User/ProductPage';
import Dashboard from './pages/Admin/Dashboard';
import ProductsList from './Components/Inventory_Management/MangeProduct/ProductsList';
import AddProduct from './Components/Inventory_Management/MangeProduct/AddProduct';
import EditProduct from './Components/Inventory_Management/MangeProduct/EditProduct';
import ViewProduct from './Components/Inventory_Management/MangeProduct/ViewProduct';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Signup from './Components/User_Management/signup';
import Login from './Components/User_Management/Login';
import ForgotPassword from './Components/User_Management/ForgotPassword';
import UpdateUsers from './Components/User_Management/updateuser';
import ResetPassword from './Components/User_Management/ResetPassword';
import OTPVerification from './Components/User_Management/OTPVerification';
import OTP from './Components/User_Management/otpregiter';

import Users from './Components/User_Management/displayuserdetails';
import CreateUsers from './Components/User_Management/createuser'; 
import AccountDetails from './Components/User_Management/AccountDetails';
import SecuritySettings from './Components/User_Management/SecuritySettings';
import Staff from './Components/User_Management/staffdetails';
import CreateStaff from './Components/User_Management/createstaff';
import UpdateStaff from './Components/User_Management/staffupdate';

import GiveFeedback from './Components/Feedback Management/GiveFeedback';
import AddAForm from "./Components/Appointment_Management/AddAForm";
import UpdateAppointment from './Components/Appointment_Management/UpdateAppointment';
import UserAppointmentList from './Components/Appointment_Management/ManageAppointment/userAppoinmentList';
import CartPage from './pages/User/CartPage';
import OrderList from './Components/Order_Management/OrderList';
import UserOderList from './Components/Order_Management/UserOderList';
import AppointmentList from './Components/Appointment_Management/ManageAppointment/appointmentList';
import EditOrder from './Components/Order_Management/EditOrder';
import UserOrderEdit from './Components/Order_Management/userOderEdit';
import UpdateFeedback from './Components/Feedback Management/UpdateFeedback';
import FeedbackList from './Components/Feedback Management/FeedbackList';
import StaffDashboard from'./Components/User_Management/staff';


// import StaffDashboard from './Components/User_Management/staff'
// import Home from'./pages/leavemanagement/Admin/homepage';
// import SidebarA from './Components/leave_management/SidebarA';
// import MyLeaves from './pages/leavemanagement/Admin/MyLeaves';

// import StaffDashboard from './Components/User_Management/staff';
// import Home from './pages/leavemanagement/Admin/homepage';
// import SidebarA from './Components/leave_management/SidebarA';
// import MyLeaves from './pages/leavemanagement/Admin/MyLeaves';


const AdminRouteGuard = ({ element }) => {
  const userRole = Cookies.get('role');

  if (userRole === 'admin') {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

const UserRouteGuard = ({ element }) => {
  const userRole = Cookies.get('role');

  if (userRole === 'user') {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

const AllUsersRouteGuard = ({ element }) => {
  const userRole = Cookies.get('role');

  if (userRole === 'admin' || userRole === 'user' || userRole === 'staff' ) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserRouteGuard element={<HomePage />} />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route
          path="/admin/*"
          element={<AdminRouteGuard element={<Dashboard />} />}
        />
        <Route path="/admin/productsList" element={<ProductsList />} />
        <Route
          path="/admin/productsList/addProduct"
          element={<AdminRouteGuard element={<AddProduct />} />}
        />
        <Route
          path="/admin/productsList/editProduct/:id"
          element={<AdminRouteGuard element={<EditProduct />} />}
        />
        <Route
          path="/admin/productsList/viewProduct/:id"
          element={<AdminRouteGuard element={<ViewProduct />} />}
        />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/otp" element={<OTP />} />
        <Route
          path="/userdetails"
          element={<AdminRouteGuard element={<Users />} />}
        />
        <Route
          path="/usercreate"
          element={<AdminRouteGuard element={<CreateUsers />} />}
        />
        <Route
          path="/userupdate/:id"
          element={<AdminRouteGuard element={<UpdateUsers />} />}
        />
        <Route
          path="/AccountDetails"
          element={<AllUsersRouteGuard element={<AccountDetails />} />}
        />
        <Route
          path="/SecuritySettings"
          element={<AllUsersRouteGuard element={<SecuritySettings />} />}
        />
        <Route path="/createstaff" element={<CreateStaff />} />
        <Route path="/staffdetails" element={<Staff />} />
        <Route path="/staffupdate/:id" element={<UpdateStaff />} />
        <Route path="/staffdetails" element={<Staff />} />
        <Route path="/AppointmentList" element={<AppointmentList />} />
        <Route path="/addForm" element={<AddAForm />} />
        <Route path="/updateAppointment/:id" element={<UpdateAppointment />} />
        <Route path="/userAppointmentList" element={<UserAppointmentList />} />
        <Route path="/OrderList" element={<OrderList />} />
        <Route path="/UserOrderList" element={<UserOderList />} />
        <Route path="/admin/order/editOrder/:id" element={<EditOrder />} />
        <Route path="/order/userOderEdit/:id" element={<UserOrderEdit />} />
        <Route path="/AddFeddback/:id" element={<GiveFeedback />} />
        <Route path="/UpdateFeedback/:id" element={<UpdateFeedback />} />
        <Route path="/staff" element={< StaffDashboard />} />

       
        StaffDashboard

        <Route path="/admin/FeedbackList" element={<FeedbackList />} />

        
{/* <Route path="/staff" element={<StaffDashboard />} />
<Route path="/Home" element={<Home />} />
<Route
  path="/SidebarA"
  element={
    <SidebarA>
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/MyLeaves/:id" element={<MyLeaves />} />
    </SidebarA>
  }
/> */}


       
        <Route path="/FeedbackList" element={<FeedbackList />} />

      </Routes>
    </div>
  );
}

export default App;
