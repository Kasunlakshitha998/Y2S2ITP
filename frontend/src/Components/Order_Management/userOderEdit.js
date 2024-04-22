import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserOrderEdit = () => {
  const { id } = useParams();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentOption, setPaymentOption] = useState('cash');
  const [checkoutError, setCheckoutError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8175/order/edit/${id}`)
      .then((res) => {
        console.log(res.data);
        setDeliveryAddress(res.data.deliveryAddress);
        setPaymentOption(res.data.deliveryAddress);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);


function UpdateData(e) {
  e.preventDefault();

  const UpdateOrder = {
    deliveryAddress,
    paymentOption,
  };

  axios
    .put(`http://localhost:8175/order/edit/${id}`, UpdateOrder)
    .then((res) => {
      console.log('updated successfully:', res.data);
    })
    .catch((err) => {
      console.error('Error updating :', err);
    });
}


  const handleAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };



  return (
    <div>
      <div className="checkout-form mt-8">
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
