import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../pages/User/CartSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CheckoutComponent = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentOption, setPaymentOption] = useState('cash');
  const [checkoutError, setCheckoutError] = useState(null);
  const [image, setImage] = useState([]);
  

  const handleAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await checkoutHandler();
    } catch (error) {
      setCheckoutError(error.message);
    }
  };

  const checkoutHandler = async () => {
    const UserID = Cookies.get('userId');
    // Prepare data to be sent
    const checkoutData = {
      UserID,
      deliveryAddress,
      paymentOption,
      items: cartItems.map((item) => ({
        productId: item._id,
        productName: item.name,
        quantity: item.cartQuantity,
        totalPrice: item.price * item.cartQuantity,
        // Add other details as needed
      })),
      image,
    };

    console.log(checkoutData);
    
    try {
      // Send data using Axios
      const response = await axios.post(
        'http://localhost:8175/order/add',
        checkoutData
      );
      console.log('Checkout successful:', response.data);

      // Call updateStock for each item in the cart
      for (const item of cartItems) {
        await updateStock(item._id, item.cartQuantity, item.countInStock);
      }

      // Clear the cart after updating stock
      dispatch(clearCart());
      navigate('/UserOrderList');
    } catch (error) {
      console.error('Error during checkout:', error);
      throw new Error('Failed to complete checkout');
    }
  };

  const updateStock = async (id, quantity, countInStock) => {
    const newCountInStock = countInStock - quantity;

    if (newCountInStock >= 0) {
      await axios.put(`http://localhost:8175/product/update/${id}`, {
        countInStock: newCountInStock,
      });
      console.log('Quantity updated successfully');
    } else {
      throw new Error('Insufficient stock');
    }
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
      <div className="checkout-form mt-8">
        <form onSubmit={handleSubmit}>
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

            {paymentOption === 'bank' && (
              <div className="mb-4">
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
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutComponent;
