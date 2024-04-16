import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function RegistrationForm() {
  const [currentTab, setCurrentTab] = useState(0);
  const [name, setName] = useState('');
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const showTab = (n) => {
    const tabs = document.getElementsByClassName('tab');
    tabs[n].style.display = 'block';
    if (n === 0) {
      document.getElementById('prevBtn').style.display = 'none';
    } else {
      document.getElementById('prevBtn').style.display = 'inline';
    }
    if (n === tabs.length - 1) {
      document.getElementById('nextBtn').style.display = 'none';
    } else {
      document.getElementById('nextBtn').style.display = 'inline';
    }
  };

  const nextPrev = (n) => {
    const tabs = document.getElementsByClassName('tab');
    if (n === 1 && !validateForm()) return;
    tabs[currentTab].style.display = 'none';
    setCurrentTab(currentTab + n);
    showTab(currentTab + n);
  };

  const validateForm = () => {
    const tabs = document.getElementsByClassName('tab');
    const inputs = tabs[currentTab].getElementsByTagName('input');
    let valid = true;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === '') {
        inputs[i].classList.add('invalid');
        valid = false;
      }
    }
    if (valid) {
      document.getElementsByClassName('step')[currentTab].classList.add('finish');
    }
    return valid;
  };


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      setImage(base64);
      return;
    }

    const base64s = [];
    for (var i = 0; i < files.length; i++) {
      var base = await convertBase64(files[i]);
      base64s.push(base);
    }
    setImage(base64s);
  };

  const clearForm = () => {
    setName('');
    setImage([]);
    setCategory('');
    setBrand('');
    setPrice('');
    setCountInStock('');
    setDescription('');
  };

  const addData = (e) => {
    e.preventDefault();

    const newProduct = {
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
      .post('http://localhost:8175/product/add', newProduct)
      .then(() => {
        setLoading(false);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product added successfully',
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
          title: 'Error with product addition',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(err);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 shadow-md w-96">
        <h1 className="text-center text-2xl font-bold mb-8">Add Product</h1>
        <form onSubmit={addData}>
          <div className={`tab ${currentTab === 0 ? 'block' : 'hidden'}`}>
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
                <option value="Tablets">Tablets</option>
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

          <div className={`tab ${currentTab === 1 ? 'block' : 'hidden'}`}>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <div>
                {Array.isArray(image) ? (
                  image.map((img, index) => (
                    <img
                      key={index}
                      width={200}
                      height={200}
                      src={img}
                      alt={`productImage${index}`}
                    />
                  ))
                ) : image ? (
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
                onChange={uploadImage}
                multiple
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              id="prevBtn"
              onClick={() => nextPrev(-1)}
              className={`bg-blue-400 text-white py-2 px-4 rounded-md ${
                currentTab === 0 ? 'hidden' : 'inline'
              }`}
            >
              Previous
            </button>
            <button
              type="button"
              id="nextBtn"
              onClick={() => nextPrev(1)}
              className={`bg-green-500 text-white py-2 px-4 rounded-md ${
                currentTab === 1 ? 'hidden' : 'inline'
              }`}
            >
              Next
            </button>
            <button
              type="submit"
              id="submitBtn"
              className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
                currentTab === 1 ? 'inline' : 'hidden'
              }`}
            >
              Submit
            </button>
          </div>
          <div className="flex justify-center mt-8">
            <span className="step bg-gray-400 rounded-full h-2 w-2 mx-2"></span>
            <span className="step bg-gray-400 rounded-full h-2 w-2 mx-2"></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
