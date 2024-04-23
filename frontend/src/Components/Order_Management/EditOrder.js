import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNav from '../Nav/adminNav';

function EditOrder() {
  const { id } = useParams();
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentOption, setPaymentOption] = useState('');
  const [image, setImage] = useState([]);
  

  useEffect(() => {
    axios
      .get(`http://localhost:8175/order/getOrder/${id}`)
      .then((res) => {
        console.log(res.data);
        setDeliveryStatus(res.data.deliveryStatus);
        setPaymentStatus(res.data.paymentStatus);
        setImage(res.data.image);
        setPaymentOption(res.data.paymentOption);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  
  function UpdateData(e) {
    e.preventDefault();

    const UpdateOrder = {
      deliveryStatus,
      paymentStatus,
    };
  
    axios
      .put(`http://localhost:8175/order/editStatus/${id}`, UpdateOrder)
      .then((res) => {
        console.log('updated successfully:', res.data);
        alert('Update successfully');
      })
      .catch((err) => {
        console.error('Error updating :', err);
      });
  }


  const handleDeliveryStatusChange = (e) => {
    setDeliveryStatus(e.target.value);
  };

  const handlePaymentStatusChange = (e) => {
    setPaymentStatus(e.target.value);
  };

  

  return (
    <div>
      <header>
        <AdminNav />
      </header>
      <div className="checkout-form mt-20 ml-60">
        <form onSubmit={UpdateData} className="max-w-xl">
          <div>
            <div className="mb-4">
              <label htmlFor="paymentOption" className="block font-medium">
                Delivery Status
              </label>
              <select
                id="paymentOption"
                value={deliveryStatus}
                onChange={handleDeliveryStatusChange}
                className="w-full border rounded py-2 px-3 mt-1"
                required
              >
                <option value="Pending">Pending</option>
                <option value="Confirm">Ok</option>
              </select>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="paymentOption" className="block font-medium">
                Payment Status
              </label>
              <select
                id="paymentOption"
                value={paymentStatus}
                onChange={handlePaymentStatusChange}
                className="w-full border rounded py-2 px-3 mt-1"
                required
              >
                <option value="Pending">Pending</option>
                <option value="Confirm">Ok</option>
              </select>
            </div>
            <div>
              <h3>Payment Method: {paymentOption}</h3>
              {paymentOption === 'bank' && (
                <img
                  src={image}
                  alt={paymentOption}
                  style={{ width: '200px', height: '200px' }}
                />
              )}
            </div>
          </div>

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
}

export default EditOrder;
