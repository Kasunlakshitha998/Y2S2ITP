import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNav from './../Nav/userNav';

const UserOrderEdit = () => {
  const { id } = useParams();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [number, setnumber] = useState('');
  const [paymentOption, setPaymentOption] = useState('cash');
  const [checkoutError, setCheckoutError] = useState(null);
  const [paymentStatus, setpaymentStatus] = useState('Pending');
  const [image, setImage] = useState([]);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`http://localhost:8175/order/getOrder/${id}`)
      .then((res) => {
        console.log(res.data);
        setDeliveryAddress(res.data.deliveryAddress);
        setPaymentOption(res.data.paymentOption);
        setnumber(res.data.number);
        setImage(res.data.image);
        setpaymentStatus('Pending');
      })
      .catch((err) => {
        alert(err.message);
        setCheckoutError("error");
      });
  }, [id]);


function UpdateData(e) {
  e.preventDefault();

  const UpdateOrder = {
    deliveryAddress,
    paymentOption,
    number,
    image,
    paymentStatus,
  };

  axios
    .put(`http://localhost:8175/order/edit/${id}`, UpdateOrder)
    .then((res) => {
      console.log('updated successfully:', res.data);
      alert("Update successfully")
      navigate('/UserOrderList');
    })
    .catch((err) => {
      console.error('Error updating :', err);
      setCheckoutError('error');
    });
}

  const handlenumberChange = (e) => {
    setnumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

 const handleImageUpload = (e) => {
   const file = e.target.files[0];

   if (file) {
     const reader = new FileReader();

     reader.onload = () => {
       const base64String = reader.result;
       setImage(base64String);
     };

     reader.readAsDataURL(file);
   }
 };

  return (
    <div>
      <header>
        <UserNav />
      </header>
      <div className="checkout-form m-28 max-w-xl">
        <form onSubmit={UpdateData}>
          <div className="mb-4">
            <label htmlFor="deliveryAddress" className="block font-medium">
              Delivery Address
            </label>
            <input
              type="text"
              id="deliveryAddress"
              value={deliveryAddress}
              onChange={handleAddressChange}
              className="w-full border rounded py-2 px-3 mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="number" className="block font-medium">
              Phone Number
            </label>
            <input
              type="number"
              id="deliveryAddress"
              value={number}
              onChange={handlenumberChange}
              className="w-full border rounded py-2 px-3 mt-1"
              required
              min="10"
            />
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="paymentOption" className="block font-medium">
                Payment Option
              </label>
              <select
                id="paymentOption"
                value={paymentOption}
                onChange={handlePaymentOptionChange}
                className="w-full border rounded py-2 px-3 mt-1"
                required
              >
                <option value="cash">Cash on Delivery</option>
                <option value="bank">Bank Deposit</option>
              </select>
            </div>
            {paymentOption === 'bank' && (
              <div className="mb-4">
                <img
                  src={image}
                  alt={paymentOption}
                  style={{ width: '100%' }}
                />

                <label htmlFor="bankImage" className="block font-medium">
                  Bank Image
                </label>
                <input
                  type="file"
                  id="bankImage"
                  accept="image/*"
                  className="w-full border rounded py-2 px-3 mt-1"
                  onChange={handleImageUpload}
                />
                <ul>
                  <h4>Bank Details</h4>
                  <li>Bank Name - BOC</li>
                  <li>Account No - 008825786</li>
                  <li>Bank Branch - Malabe</li>
                </ul>
              </div>
            )}
          </div>
          {checkoutError && <p className="text-red-500">{checkoutError}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Update Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserOrderEdit;
