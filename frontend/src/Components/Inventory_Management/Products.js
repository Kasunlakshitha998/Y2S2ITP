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
  const [isCategoryOpen, setIsCatogeryOpen] = useState(false);
  
  const toggleCategory = () => {
    setIsCatogeryOpen(!isCategoryOpen);
  };

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
            <div className="flex">
              <button
                onMouseMove={toggleCategory}
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 rounded-lg hover:bg-gray-200"
                type="button"
              >
                All categories{' '}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div className="z-10 relative">
                {isCategoryOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul>
                      <li>
                        <button
                          className="categoryButton hover:bg-gray-100 w-full py-2 px-4 text-left"
                          onClick={reSet}
                        >
                          All
                        </button>
                      </li>
                      <li>
                        <button
                          className="categoryButton hover:bg-gray-100 w-full py-2 px-4 text-left"
                          onClick={() => filterRes('iphone')}
                        >
                          iPhone
                        </button>
                      </li>
                      <li>
                        <button
                          className="categoryButton hover:bg-gray-100 w-full py-2 px-4 text-left"
                          onClick={() => filterRes('android')}
                        >
                          Android
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="relative w-full">
                <input
                  type="search"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search products..."
                  onChange={(e) => {
                    setSearchItem(e.target.value);
                  }}
                  required
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {filter ? (
            <>
              <div className="products">
                {cat
                  .filter((product) => {
                    if (searchItem === '') {
                      return product;
                    } else if (
                      product.name
                        .toLowerCase()
                        .includes(searchItem.toLowerCase())
                    ) {
                      return product;
                    }
                  })
                  .map((product) => (
                    <div
                      className="w-full m-1 p-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow"
                      key={product._id}
                    >
                      <Link to={`/product/${product._id}`}>
                        <div>
                          {Array.isArray(product.image) ? (
                            <div>
                              <img
                                src={product.image[0]}
                                alt={`${product.name}_0`}
                                className="p-8 rounded-t-lg"
                              />
                              <strong className="text-xl font-semibold tracking-tight text-gray-900">
                                {product.name}
                              </strong>
                            </div>
                          ) : (
                            product.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="p-8 rounded-t-lg"
                              />
                            )
                          )}
                        </div>
                      </Link>

                      {/* rating */}
                      <div className="flex items-center mt-2.5 mb-5">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse">
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class="w-4 h-4 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        </div>
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                          5.0
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <strong class="text-3xl font-bold text-gray-900">
                          <p>Rs. {product.price}</p>
                        </strong>
                        <Link
                          to="#"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Add to cart
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <>
              <div className="products">
                {products
                  .filter((product) => {
                    if (searchItem === '') {
                      return product;
                    } else if (
                      product.name
                        .toLowerCase()
                        .includes(searchItem.toLowerCase())
                    ) {
                      return product;
                    }
                  })
                  .map((product) => (
                    <div
                      className="m-1 p-3 max-w-sm max-h-sm bg-white border border-gray-200 rounded-lg shadow"
                      key={product._id}
                    >
                      <Link to={`/product/${product._id}`}>
                            <div>
                              <img
                                src={product.image[0]}
                                alt={`${product.name}_0`}
                                className="p-8 max-w-xxl rounded-t-lg"
                              />
                              <strong className="text-xl font-semibold tracking-tight text-gray-900">
                                {product.name}
                              </strong>
                            </div>
                      </Link>

                      {/* rating */}
                      <div className="flex items-center mt-2.5 mb-5">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse">
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class="w-4 h-4 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        </div>
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                          5.0
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <strong class="text-xl font-bold text-gray-900">
                          <p>Rs. {product.price}</p>
                        </strong>
                        <Link
                          to="#"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Add to cart
                        </Link>
                      </div>
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
