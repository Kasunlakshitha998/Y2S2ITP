import React from 'react';
import UserNav from '../../Components/Nav/userNav';
import Products from '../../Components/Inventory_Management/Products';
import Footer from '../../Components/Nav/footer';
import './HomePage.css';

function HomePage() {
  return (
    <div>
      <div className="header">
        <UserNav />
      </div>

      <div className="home">
        <div className="main-text">
          <h1>
            Discover The Best <br />
            Phone Shop For You 
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            inventore nulla quis doloribus modi magni iusto earum!
            Necessitatibus, quidem quia.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            inventore nulla quis doloribus modi magni iusto earum!
            Necessitatibus, quidem quia.
          </p>
          <button id="btn">View More</button>
        </div>
      </div>

      <section className="offers">
        <div className="offer-content">
          <div className="row">
            <i className="fa-solid fa-truck-fast"></i>
            <h3>Free Delivery</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="row">
            <i className="fa-solid fa-headset"></i>
            <h3>Support 24/7</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="row">
            <i className="fa-solid fa-rotate-left"></i>
            <h3>30 Day Return</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="row">
            <i className="fa-solid fa-cart-shopping"></i>
            <h3>Secure Shopping</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </section>

      <section className="product" id="product">
        <div className="main-txt">
          <h3>Products</h3>
        </div>
        <Products />
      </section>

      <section className="review" id="review">
        <div className="main-txt">
          <h3>
            Customers <span>Review</span>
          </h3>
        </div>
        <div className="review-content">{/* Customer reviews content */}</div>
      </section>

      <div id="footer">
        <Footer />
      </div>

      <a href="#" className="arrow">
        <i>
          <img src='./image/o2.png' alt="hhh" width="50px" />
        </i>
      </a>
    </div>
  );
}

export default HomePage;
