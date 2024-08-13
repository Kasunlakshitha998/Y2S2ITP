import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './productPage.css';
import ReviewStar from '../Feedback Management/ReviewStar';
import { BsBagPlus } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';

function Products() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState([]);
  const [isCategoryOpen, setIsCatogeryOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const toggleCategory = () => {
    setIsCatogeryOpen(!isCategoryOpen);
  };

  const reSet = () => {
    setFilter(false);
    setMinPrice('');
    setMaxPrice('');
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

  const applyFilters = (product) => {
    const matchesSearch =
      searchItem === '' ||
      product.name.toLowerCase().includes(searchItem.toLowerCase());
    const matchesCategory = !filter || cat.includes(product);
    const matchesPrice =
      (minPrice === '' || product.price >= Number(minPrice)) &&
      (maxPrice === '' || product.price <= Number(maxPrice));
    return matchesSearch && matchesCategory && matchesPrice;
  };

  return (
    <div className="Container">
      <>
        <div className="ListCategory">
          <div className="flex">
            <button
              onClick={toggleCategory}
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 rounded-lg hover:bg-gray-200"
              type="button"
            >
              All categories
              <IoIosArrowDown />
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
                        onClick={() => filterRes('Iphone')}
                      >
                        I Phone
                      </button>
                    </li>
                    <li>
                      <button
                        className="categoryButton hover:bg-gray-100 w-full py-2 px-4 text-left"
                        onClick={() => filterRes('Android')}
                      >
                        Android
                      </button>
                    </li>
                    <li>
                      <button
                        className="categoryButton hover:bg-gray-100 w-full py-2 px-4 text-left"
                        onClick={() => filterRes('Tablets')}
                      >
                        Tablets
                      </button>
                    </li>
                    <li>
                      <button
                        className="categoryButton hover:bg-gray-100 w-full py-2 px-4 text-left"
                        onClick={() => filterRes('accessories')}
                      >
                        Accessories
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
                <AiOutlineSearch />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center my-4">
          <div className="flex space-x-4">
            <input
              type="number"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button
              onClick={reSet}
              className="p-2.5 text-sm font-medium text-white bg-red-500 rounded-lg border border-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Reset
            </button>
          </div>
        </div>
      </>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-10 gap-x-8 mt-4 mb-4">
            {(filter ? cat : products).filter(applyFilters).map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="w-72 bg-white shadow-md rounded-xl duration-200 hover:scale-105 hover:shadow-xl">
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
                    <div className="flex items-center mt-2.5">
                      <ReviewStar id={product._id} />
                    </div>

                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-blue-700 cursor-auto my-3">
                        Rs.{product.price.toLocaleString()}
                      </p>
                      <del>
                        <p className="text-sm text-red-600 cursor-auto ml-2">
                          Rs.{product.price.toLocaleString()}
                        </p>
                      </del>

                      <div className="ml-auto">
                        <Link to="/cart">
                          <BsBagPlus size={20} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
