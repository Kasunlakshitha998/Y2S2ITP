import React from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../../Nav/adminNav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './product.css';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function getProducts() {
      axios
        .get('http://localhost:8175/product/')
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getProducts();
  }, []);

  useEffect(() => {
    // Check if there are any products out of stock
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
          .then((response) => {
            setLoading(false);
            Swal.fire({
              title: 'Deleted!',
              text: 'product has been deleted.',
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

      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div>
            <Link to="/admin/productsList/addProduct">
              <button>+ Add Product</button>
            </Link>
          </div>

          <div className="table_container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Phone</th>
                  <th>Brand</th>
                  <th>Count In Stock</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className="table-body">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>

                    <td>{product.brand}</td>

                    <td>
                      <div className="stock">
                        {product.countInStock > 0 ? (
                          <span>{product.countInStock}</span>
                        ) : (
                          <span className="outStock">Out of Stock</span>
                        )}
                      </div>
                    </td>

                    <td>
                      <div>
                        {product.image &&
                        typeof product.image !== 'string' &&
                        product.image.url ? (
                          <img
                            src={product.image.url}
                            alt={product.name}
                            style={{ width: '100px', height: '80px' }}
                          />
                        ) : (
                          <span>No image available</span>
                        )}
                      </div>
                    </td>

                    <td>{product.price}</td>

                    <td>
                      <Link
                        to={`/admin/productsList/editProduct/${product._id}`}
                      >
                        <button className="edit-btn">Edit</button>
                      </Link>
                      <button
                        className="delete-btn"
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
    </div>
  );
}

export default ProductsList;
