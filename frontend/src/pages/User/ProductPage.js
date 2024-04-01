import { useParams } from 'react-router-dom';
import UserNav from '../../Components/Nav/userNav';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
    }
  };

  // order button click
  const updateStock = () => {
    const countInStock = product.countInStock - quantity;

    if (countInStock >= 0) {
      axios
        .put(`http://localhost:8175/product/update/${id}`, { countInStock })
        .then((res) => {
          console.log('Quantity updated successfully:', res.data);
        })
        .catch((err) => {
          console.error('Error updating quantity:', err);
        });
    } else {
      console.log('error');
    }
  };

  //get product details using id
  useEffect(() => {
    function getProduct() {
      axios
        .get(`http://localhost:8175/product/getProduct/${id}`)
        .then((res) => {
          console.log(res.data);
          setProduct(res.data.product);
          setLoading(false);
        })
        .catch((err) => {
          alert(err.message);
          setLoading(false);
        });
    }

    getProduct();
  }, [id]);

  return (
    <>
      <header>
        <UserNav />
      </header>
      <main className='maint' >
        {loading ? ( // Display loading indicator
          <div className="loader"></div>
        ) : (
          <div className="product-container">
            <div className="product-image">
              {product.image &&
              typeof product.image !== 'string' &&
              product.image.url ? (
                <img src={product.image.url} alt={product.name} />
              ) : (
                <img src={product.image} alt={product.name} />
              )}
            </div>

            <div className="product-details">
              <h1>{product.name}</h1>
              <h3>{product.description}</h3>
              <strong>
                <p>Brand: {product.brand}</p>
                <p>Price: Rs. {product.price}</p>
                <p>Category: {product.category}</p>
              </strong>

              <div className="button-section">
                {product.countInStock === 0 ? (
                  <>
                    <strong>Out of Stock</strong>
                    {/* add to wichst list */}
                    {/* <div className="quantity-selector">
                  <button
                    onClick={decrementQuantity}
                    disabled
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    disabled
                  >
                    +
                  </button>
                </div> */}
                  </>
                ) : (
                  <>
                    <div className="quantity-selector">
                      <button
                        onClick={decrementQuantity}
                        disabled={quantity == 0}
                      >
                        -
                      </button>
                      <span className="quantity-display">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        disabled={quantity >= product.countInStock}
                      >
                        +
                      </button>
                    </div>
                    <button className="add-to-cart" disabled={quantity === 0}>
                      Add to Cart
                    </button>

                    <button
                      className="order-button"
                      onClick={updateStock}
                      disabled={quantity == 0}
                    >
                      Order Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default ProductPage;
