import React from 'react';
import UserNav from '../../Components/Nav/userNav';
import Products from '../../Components/Inventory_Management/Products';
import Footer from '../../Components/Nav/footer';
import './HomePage.css';

function HomePage() {
  return (
    <>

      <nav>
       <UserNav/>
      </nav>

      <section className="home">
        <div className="content">
          <h1>
            {' '}
            <span>Electronic Products</span>
            <br />
            Up To <span id="span2">50%</span> Off
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta,
            saepe.
            <br />
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <div className="btn">
            <button>Shop Now</button>
          </div>
        </div>
        <div className="img">
          <img src="image/background.jpg" alt="gg" />
        </div>
      </section>

      <div className="container" id="product-cards">
        <h1 className="text-center">PRODUCTS</h1>
        <div className="row" style={{ marginTop: '30px' }}>
          <div className="col-md-3 py-3 py-md-0">
            <div className="card">
              <img src="./images/p6.png" alt="" />
              <div className="card-body">
                <h3 className="text-center">Iphone 13 pro</h3>
                <p className="text-center">Lorem ipsum dolor sit amet.</p>
                <div className="star text-center">
                  <i className="fa-solid fa-star checked"></i>
                  <i className="fa-solid fa-star checked"></i>
                  <i className="fa-solid fa-star checked"></i>
                  <i className="fa-solid fa-star checked"></i>
                  <i className="fa-solid fa-star checked"></i>
                </div>
                <h2>
                  $1000{' '}
                  <span>
                    <li className="fa-solid fa-cart-shopping"></li>
                  </span>
                </h2>
              </div>
            </div>
          </div>
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

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>
    </>
  );
}

export default HomePage;
