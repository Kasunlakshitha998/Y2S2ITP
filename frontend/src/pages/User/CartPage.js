import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from './CartSlice';
import { Link } from 'react-router-dom';
import CheckoutComponent from '../../Components/Order_Management/CheckoutComponent';
import UserNav from '../../Components/Nav/userNav';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  

  return (
    <>
      <header>
        <UserNav />
      </header>
      <div className="cart-container mx-1 p-4 max-w-full mt-20">
        <h2 className="text-3xl font-semibold mb-4">Shopping Cart</h2>
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping mt-4">
              <Link to="/" className="flex items-center text-blue-500">
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            {/* Left Side */}
            <div className="mr-8 w-3/4">
              <div className="cart-items">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Product</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">Total</th>

                      {/* Add Actions column */}
                    </tr>
                  </thead>
                  <tbody>
                    {cart.cartItems.map((cartItem) => (
                      <tr key={cartItem._id}>
                        <td className="border px-4 py-2">
                          <div className="cart-product flex items-center">
                            <img
                              src={cartItem.image}
                              alt={cartItem.name}
                              className="w-16 h-16 mr-4"
                            />
                            <div>
                              <h3 className="font-semibold">{cartItem.name}</h3>
                              <p>{cartItem.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="border px-4 py-2">
                          Rs.{cartItem.price}
                        </td>
                        <td className="border px-4 py-2">
                          <div className="cart-product-quantity flex items-center">
                            <button
                              onClick={() => handleDecreaseCart(cartItem)}
                              className="px-2 py-1 bg-gray-200"
                              disabled={cartItem.cartQuantity === 0}
                            >
                              -
                            </button>
                            <div className="count mx-2">
                              {cartItem.cartQuantity}
                            </div>
                            <button
                              onClick={() => handleAddToCart(cartItem)}
                              className="px-2 py-1 bg-gray-200"
                              disabled={
                                cartItem.cartQuantity >= cartItem.countInStock
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="border px-4 py-2">
                          Rs.{cartItem.price * cartItem.cartQuantity}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => handleRemoveFromCart(cartItem)}
                            className="text-red-500 font-semibold"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="cart-summary mt-8">
                <button
                  className="clear-btn bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => handleClearCart()}
                >
                  Clear Cart
                </button>
              </div>
            </div>
            {/* Right Side */}
            <div className="w-1/3 shadow-lg rounded-md p-2">
              <h3 className="font-semibold m-4">Checkout Details</h3>
              <div className="cart-checkout">
                <div className="subtotal flex justify-between items-center px-5">
                  <span>Subtotal</span>
                  <span className="amount">Rs.{cart.cartTotalAmount}</span>
                </div>
              </div>
              <CheckoutComponent />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
