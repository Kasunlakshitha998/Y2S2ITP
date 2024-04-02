import { useParams } from 'react-router-dom';
import AdminNav from '../../Nav/adminNav';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './product.css';
import { useNavigate } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  
  useEffect(() => {
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
  }, [id]);

  const [name, setName] = useState('');
  const [image, setImages] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  // Initialize state after product data is fetched
  useEffect(() => {
    if (!loading && Object.keys(product).length !== 0) {
      setName(product.name || '');
      setImages(product.image || '');
      setCategory(product.category || '');
      setBrand(product.brand || '');
      setPrice(product.price || '');
      setCountInStock(product.countInStock || '');
      setDescription(product.description || '');
    }
  }, [loading, product]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    TransFormFile(file);
  };

  const TransFormFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages(reader.result);
      };
    } else {
      setImages('');
    }
  };

  function UpdateData(e) {
    e.preventDefault();

    const UpdateProduct = {
      name,
      image,
      category,
      brand,
      price,
      countInStock,
      description,
    };
    setLoading(true);
    axios
      .put(`http://localhost:8175/product/update/${id}`, UpdateProduct)
      .then((res) => {
        console.log('updated successfully:', res.data);
        setLoading(false);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product Update Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        history('/admin/productsList');
      })
      .catch((err) => {
        console.error('Error updating :', err);
        setLoading(false);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error with Product Update',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  return (
    <>
      <header>
        <AdminNav />
      </header>
      <main>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="product-container">
            <div className="containerAddProduct">
              <h2>Edit Product</h2>
              <form
                onSubmit={UpdateData}
                id="productForm"
                className="formContainer"
              >
                <div className="formLeft">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="select"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="iphone">iPhone</option>
                      <option value="android">Android Phones</option>
                      <option value="windows">Windows Phones</option>
                      <option value="other">Other Phones</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="countInStock">Count In Stock:</label>
                    <input
                      type="number"
                      id="countInStock"
                      name="countInStock"
                      min="0"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="formRight">
                  <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <div>
                      {image.url ? (
                        <img
                          width={200}
                          height={200}
                          src={image.url}
                          alt="productImage"
                        />
                      ) : (
                        <img
                          width={200}
                          height={200}
                          src={image}
                          alt="productImage"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/"
                      onChange={handleImage}
                    />
                  </div>
                  <button disabled={loading} type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default EditProduct;
