import UserNav from '../../Components/Nav/userNav';
import Products from '../../Components/Inventory_Management/Products'
import Footer from '../../Components/Nav/footer';
import Sidebar from '../../Components/Leave_Management/Admin/Sidebar';

function HomePage() {

  
  return (
    <div>
      <header>
        <UserNav />
      </header>
      <h2>Item List </h2>
      
        <Products />
        <Sidebar/>


      <Footer />
    </div>
  );
}
export default HomePage;
