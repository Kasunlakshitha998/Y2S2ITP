import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminNav from './../../Nav/adminNav';
import './product.css';


function AddProduct() {
  const [name, setName] = useState('');
  const [image, setImages] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const hadndelImage = (e) => {
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

  function AddData(e) {
    e.preventDefault();

    const NewProduct = {
      name,
      image,
      category,
      brand,
      price,
      countInStock,
      description,
    };

    console.log(NewProduct);
    setLoading(true);

    axios
      .post('http://localhost:8175/product/add', NewProduct)
      .then(() => {
        setLoading(false);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product ADD Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        clearForm();
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error with Product ADD',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err);
      });
  }

  const clearForm = () => {
    setName('');
    setImages('');
    setCategory('');
    setBrand('');
    setPrice('');
    setCountInStock('');
    setDescription('');
  };

  return (
    <div>
      <header>
        <AdminNav />
      </header>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="containerAddProduct">
          <h2>Add Product</h2>
          <form onSubmit={AddData} id="productForm" className="formContainer">
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
                  {image ? (
                    <img
                      width={200}
                      height={200}
                      src={image}
                      alt="productImage"
                    />
                  ) : (
                    <p>No Image Selected</p>
                  )}
                </div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/"
                  onChange={hadndelImage}
                />
              </div>
              <button disabled={loading} type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
