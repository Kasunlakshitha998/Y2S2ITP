import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './productPage.css';

function Products() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState([]);

  const reSet = () => {
    setFilter(false);
  };

  const filterRes = (catItem) => {
    setFilter(true);
    const res = products.filter((catData) => {
      return catData.category === catItem;
    });
    setCat(res);
  };

  useEffect(() => {
    function getProducts() {
      axios
        .get('http://localhost:8175/product/')
        .then((res) => {
          //console.log(res.data);
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          alert(err.message);
          setLoading(false);
        });
    }
    getProducts();
  }, []);

  return (
    <div className="Container">
      {loading ? ( // Display loading indicator
        <div className="loader"></div>
      ) : (
        <>
          <div className="ListCategory">
            <h2>Category</h2>
            <ul>
              <li>
                <button onClick={reSet}>All</button>
              </li>
              <li>
                <button className="iphone" onClick={() => filterRes('iphone')}>
                  I Phone
                </button>
              </li>
              <li>
                <button
                  className="android"
                  onClick={() => filterRes('android')}
                >
                  Android
                </button>
              </li>
            </ul>
          </div>

          {filter ? (
            <>
              <div className="products">
                {cat.map((product) => (
                  <div className="product" key={product._id}>
                    <Link to={`/product/${product._id}`}>
                      <div>
                        {product.image &&
                        typeof product.image !== 'string' &&
                        product.image.url ? (
                          <div>
                            <img src={product.image.url} alt={product.name} />
                            <strong>{product.name}</strong>
                          </div>
                        ) : (
                          <div>
                            <img src={product.image} alt={product.name} />
                            <strong>{product.name}</strong>
                          </div>
                        )}
                      </div>
                    </Link>

                    <strong>
                      <p>Rs. {product.price}</p>
                    </strong>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div class="container" id="product-cards">
                <h1 class="text-center">PRODUCTS</h1>
                <div class="row" style={{ }} >
                  {products.map((product) => (
                    <div class="col-md-3 py-3 py-md-0" key={product._id}>
                      <div class="card">
                        <Link to={`/product/${product._id}`}>
                          <div>
                            {product.image &&
                            typeof product.image !== 'string' &&
                            product.image.url ? (
                              <img src={product.image.url} alt={product.name} />
                            ) : (
                              <img src={product.image} alt={product.name} />
                            )}
                            <strong>{product.name}</strong>
                          </div>
                        </Link>
                        <div class="card-body">
                          <h3 class="text-center">{product.name}</h3>
                          <p class="text-center">{product.description}</p>
                          <div class="star text-center">
                            {/* Add your star rating component here */}
                          </div>
                          <h2>
                            Rs. {product.price}{' '}
                            <span>
                              <li class="fa-solid fa-cart-shopping"></li>
                            </span>
                          </h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
