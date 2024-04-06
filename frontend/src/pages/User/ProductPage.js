import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserNav from '../../Components/Nav/userNav';
import './product.css';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(
          `http://localhost:8175/product/getProduct/${id}`
        );
        setProduct(res.data.product);
        setLoading(false);
      } catch (err) {
        alert(err.message);
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % product.image.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [product.image]);

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

  const showSlides = (index) => {
    setSlideIndex(index);
  };

  return (
    <>
      <header>
        <UserNav />
      </header>
      <main className="maint">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="product-container">
            <div className="product-image">
              {product.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name}_${index}`}
                  style={{ display: index === slideIndex ? 'block' : 'none' }}
                />
              ))}
              <a
                className="prev"
                onClick={() =>
                  showSlides(
                    (slideIndex + product.image.length - 1) %
                      product.image.length
                  )
                }
              >
                ❮
              </a>
              <a
                className="next"
                onClick={() =>
                  showSlides((slideIndex + 1) % product.image.length)
                }
              >
                ❯
              </a>
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
                  <strong>Out of Stock</strong>
                ) : (
                  <>
                    <div className="quantity-selector">
                      <button
                        onClick={decrementQuantity}
                        disabled={quantity === 0}
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
                      disabled={quantity === 0}
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
