import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../pages/User/CartSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CheckoutComponent = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
    const navigate = useNavigate();
    
  const checkoutHandler = () => {
    // Call updateStock for each item in the cart
    cartItems.forEach((item) => {
      updateStock(item._id, item.cartQuantity, item.countInStock);
    });

    // Clear the cart after updating stock
      dispatch(clearCart());
      navigate('/order')
  };

  const updateStock = (id, quantity, countInStock) => {
    const newCountInStock = countInStock - quantity;

    if (newCountInStock >= 0) {
      axios
        .put(`http://localhost:8175/product/update/${id}`, {
          countInStock: newCountInStock,
        })
        .then((res) => {
          console.log('Quantity updated successfully:', res.data);
        })
        .catch((err) => {
          console.error('Error updating quantity:', err);
        });
    } else {
      console.log('Error: Insufficient stock');
    }
  };

  return (
    <div>
      <button
        onClick={checkoutHandler}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckoutComponent;
