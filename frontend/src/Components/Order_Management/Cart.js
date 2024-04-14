import React from 'react';

function CartPage({ cart }) {
  return (
    <div>
      <h1>Cart</h1>
      
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Price: Rs. {item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      
    </div>
  );
}

export default CartPage;
