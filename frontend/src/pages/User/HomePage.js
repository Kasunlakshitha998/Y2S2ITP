import React from 'react';
import UserNav from '../../Components/Nav/userNav';
import Products from '../../Components/Inventory_Management/Products';
import Footer from '../../Components/Nav/footer';
import './HomePage.css';

function HomePage() {
  function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <UserNav />

      <section className="home flex justify-between items-center m-5">
        <div className="content max-w-lg">
          <h1 className="text-4xl font-bold mb-4">
            <span>Mobile Phone Products</span>
            <br />
            Up To <span id="span2">50%</span> Off
          </h1>
          <p className="text-lg mb-8">
            Welcome to our online mobile phone shop! We offer a wide range of
            smartphones and accessories at discounted prices. Whether you're
            exploring our collection now and take advantage of our exclusive
            discounts.
          </p>
          <div className="btn">
            <button
              onClick={() => scrollToSection('section1')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className="img">
          <img src="image/background.jpg" alt="gg" className="max-w-lg" />
        </div>
      </section>

      <div id="section1">
        <div id="product-cards">
          <h1 className="text-center">PRODUCTS</h1>
          <Products />
        </div>
      </div>

      <div id="footer">
        <Footer />
      </div>

      <a href="#" className="arrow">
        <i>
          <img src="/image/arrow.png" alt="ar" />
        </i>
      </a>
    </>
  );
}

export default HomePage;
