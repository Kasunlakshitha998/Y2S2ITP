import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserNav from '../../Components/Nav/userNav';
import './productPage.css';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { addToCart } from './CartSlice';
import { useNavigate } from 'react-router-dom';
import ReviewDisplay from '../../Components/Feedback Management/ReviewDisplay';
import ReviewStar from '../../Components/Feedback Management/ReviewStar';
import { BsBagPlus } from 'react-icons/bs';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const userId = Cookies.get('userId');
  const navigate = useNavigate();

  console.log(userId);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(
          `http://localhost:8175/product/getProduct/${id}`
        );
        setProduct(res.data.product);
        setSelectedCategory(res.data.product.category);
        setLoading(false);
      } catch (err) {
        alert(err.message);
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  useEffect(() => {
    setLoading(true);
    function getRelatedProducts() {
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
    getRelatedProducts();
  }, []);

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

  // const updateStock = () => {
  //   const countInStock = product.countInStock - quantity;

  //   if (countInStock >= 0) {
  //     axios
  //       .put(`http://localhost:8175/product/update/${id}`, { countInStock })
  //       .then((res) => {
  //         console.log('Quantity updated successfully:', res.data);
  //       })
  //       .catch((err) => {
  //         console.error('Error updating quantity:', err);
  //       });
  //   } else {
  //     console.log('error');
  //   }
  // };

  const showSlides = (index) => {
    setSlideIndex(index);
  };

  const handleProductClick = (productId) => {
    const clickedProduct = products.find(
      (product) => product._id === productId
    );
    setProduct(clickedProduct);
    window.scrollTo(0, 0);
  };

  const dispatch = useDispatch();
  

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
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
          <div>
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
                <h2>Price: Rs. {product.price.toLocaleString()}</h2>
                <strong>
                  <p>Brand: {product.brand}</p>
                  <p>Category: {product.category}</p>
                </strong>
                <h3>{product.description}</h3>
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
                      <button
                        className="add-to-cart"
                        disabled={quantity === 0}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                      {/* <button
                        className="order-button"
                        onClick={updateStock}
                        disabled={quantity === 0}
                      >
                        Order Now
                      </button> */}
                    </>
                  )}
                </div>
              </div>
            </div>

            <ReviewDisplay id={id} />

            <h3>Related products</h3>
            <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-10 gap-x-8 mt-4 mb-4">
              {products
                .filter((product) => {
                  if (
                    product.category === selectedCategory &&
                    !(product._id === id)
                  ) {
                    return product;
                  } else {
                    return null;
                  }
                })
                .map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    onClick={() => handleProductClick(product._id)}
                    key={product._id}
                  >
                    <div
                      className="w-72 bg-white shadow-md rounded-xl duration-200 hover:scale-105 hover:shadow-xl"
                      key={product._id}
                    >
                      <div className="overflow-hidden">
                        <img
                          src={product.image[0]}
                          alt={`${product.name}_0`}
                          className="h-50 w-80 object-cover rounded-t-xl transition-transform duration-300 transform-gpu hover:scale-125"
                        />
                      </div>

                      <div className="px-4 py-3 w-72">
                        <strong className="text-lg font-bold text-black truncate block capitalize">
                          {product.name}
                        </strong>
                        {/* rating */}
                        <div className="flex items-center mt-2.5">
                          <ReviewStar id={product._id} />
                        </div>

                        <div class="flex items-center">
                          <p class="text-lg font-semibold text-blue-700 cursor-auto my-3">
                            Rs.149,000
                          </p>
                          <del>
                            <p class="text-sm text-red-600 cursor-auto ml-2">
                              Rs.{product.price.toLocaleString()}
                            </p>
                          </del>

                          <div class="ml-auto">
                            <Link
                              to="/cart"
                              onClick={() => handleAddToCart(product)}
                            >
                              <BsBagPlus/>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default ProductPage;
