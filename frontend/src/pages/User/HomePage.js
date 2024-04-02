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
      <nav>
        <UserNav />
      </nav>

      <section className="home">
        <div className="content">
          <h1>
            <span>Mobile Phone Products</span>
            <br />
            Up To <span id="span2">50%</span> Off
          </h1>
          <p>
            Welcome to our online mobile phone shop! We offer a wide range of
            <br />
            smartphones and accessories at discounted prices. Whether you're
            <br />
            Explore our collection now and take advantage of our exclusive
            <br />
            discounts.
          </p>
          <div className="btn">
            <button onClick={() => scrollToSection('section1')}>
              Shop Now
            </button>
          </div>
        </div>
        <div className="img">
          <img src="image/background.jpg" alt="gg" />
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
