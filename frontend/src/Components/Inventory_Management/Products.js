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
    <div>
      {loading ? ( // Display loading indicator
        <div className="loader"></div>
      ) : (
        <>
          <div>
            <ul>
              <li>
                <button onClick={reSet}>All</button>
              </li>
              <li>
                <button onClick={() => filterRes('iphone')}>I Phone</button>
              </li>
              <li>
                <button onClick={() => filterRes('android')}>Android</button>
              </li>
            </ul>
          </div>

          {filter ? (
            <div className="products">
              {cat.map((product) => (
                <div className="product" key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <div>
                      {product.image &&
                      typeof product.image !== 'string' &&
                      product.image.url ? (
                        <img src={product.image.url} alt={product.name} />
                      ) : (
                        <img src={product.image} alt={product.name} />
                      )}
                    </div>
                  </Link>

                  <strong>
                    <p>{product.price}</p>
                  </strong>

                  <button>Add to Cart</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="products">
              {products.map((product) => (
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
                        <img src={product.image} alt={product.name} />
                      )}
                    </div>
                  </Link>

                  <strong>
                    <p>{product.price}</p>
                  </strong>

                  <button>Add to Cart</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
