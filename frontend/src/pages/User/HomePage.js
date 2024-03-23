// import { Link } from 'react-router-dom';
// import data from '../../data';
import UserNav from '../../Components/Nav/userNav';
import Products from '../../Components/Inventory_Management/Products'

function HomePage() {

  
  return (
    <div>
      <header>
        <UserNav />
      </header>
      <h2>Item List </h2>
      <Products/>
      
    </div>
  );
}
export default HomePage;
