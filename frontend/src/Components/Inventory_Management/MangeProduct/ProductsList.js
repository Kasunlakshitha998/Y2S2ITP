import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../../Nav/adminNav';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  // Fetch products from API
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8175/product/')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }, []);

  // Alert for out of stock products
  useEffect(() => {
    const outOfStockProducts = products.filter(
      (product) => product.countInStock === 0
    );
    if (outOfStockProducts.length > 0) {
      const outOfStockProductNames = outOfStockProducts.map(
        (product) => product.name
      );
      Swal.fire({
        position: 'center',
        icon: 'warning',
        html: `${outOfStockProductNames.join(', ')}`,
        title: 'Some Product Are Out Of Stock',
        confirmButtonText: 'Ok',
      });
    }
  }, [products]);

  // Handle product deletion
  const handleDelete = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`http://localhost:8175/product/delete/${productId}`)
          .then(() => {
            setLoading(false);
            setProducts(
              products.filter((product) => product._id !== productId)
            );
            Swal.fire({
              title: 'Deleted!',
              text: 'Product has been deleted.',
              icon: 'success',
            });
          })
          .catch((error) => {
            setLoading(false);
            console.error('Error deleting product:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error deleting product',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  return (
    <div>
      <header>
        <AdminNav />
      </header>
      <main>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <>
            <div className="addProductBtn">
              <Link to="/admin/productsList/addProduct">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  + Add Product
                </button>
              </Link>
            </div>
            <div class="relative">
              <input
                type="text"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for items"
                onChange={(e) => {
                  setSearchItem(e.target.value);
                }}
              />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Phone
                    </th>
                    <th>Brand</th>
                    <th scope="col" class="px-6 py-3">
                      Count In Stock
                    </th>
                    <th scope="col" class="px-16 py-3">
                      Image
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="px-6 py-4">
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
                      <tr
                        className="bg-white border-b hover:bg-white-50"
                        key={product._id}
                      >
                        <td className="px-6 py-4 font-semibold text-black">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 font-semibold text-black">
                          {product.brand}
                        </td>
                        <td className="px-6 py-4 font-semibold text-black">
                          <div>
                            {product.countInStock > 0 ? (
                              <span>{product.countInStock}</span>
                            ) : (
                              <span className="outStock">Out of Stock</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            {Array.isArray(product.image) ? (
                              <img
                                src={product.image[0]}
                                alt={`${product.name}_0`}
                                style={{ width: '120px', height: '120px' }}
                              />
                            ) : (
                              product.image && (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  style={{ width: '120px', height: '120px' }}
                                />
                              )
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-black">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 font-semibold text-black">
                          <Link
                            to={`/admin/productsList/editProduct/${product._id}`}
                          >
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                              Edit
                            </button>
                          </Link>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default ProductsList;
