import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './productPage.css';

function Products() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [searchItem, setSearchItem] = useState('');
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
          <div class="ListCategory">
            <div class="categorySection">
              <h2>Category</h2>
              <ul>
                <li>
                  <button class="categoryButton iphone" onClick={reSet}>
                    All
                  </button>
                </li>
                <li>
                  <button
                    class="categoryButton iphone"
                    onClick={() => filterRes('iphone')}
                  >
                    I Phone
                  </button>
                </li>
                <li>
                  <button
                    class="categoryButton android"
                    onClick={() => filterRes('android')}
                  >
                    Android
                  </button>
                </li>
              </ul>
            </div>
            <div class="searchSection">
              <h3>Search Product</h3>
                <input type="text" placeholder="Search..." onChange={(e) => {
                  setSearchItem(e.target.value)
              }} />
            </div>
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
              <div className="products">
                    {products.filter((product) => {
                      
                      if (searchItem === "") {
                        return product;
                      } else if (product.name.toLowerCase().includes(searchItem.toLowerCase())) {
                        return product;
                      }

                    }).map((product) => (
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
          )}
        </>
      )}
    </div>
  );
}

export default Products;
