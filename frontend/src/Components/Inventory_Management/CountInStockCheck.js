import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CountInStockCheak({ cartItem, handleDecreaseCart, handleAddToCart }) {
  const [isInStock, setIsInStock] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8175/product/getProduct/${cartItem._id}`)
      .then((res) => {
        const countInStock = res.data.product.countInStock;
        setCount(countInStock); // Update count
        setIsInStock(countInStock > 0);
        // If count is 0, set cartItem.cartQuantity to 0
        if (countInStock === 0) {
          handleDecreaseCart({ ...cartItem, cartQuantity: 0 });
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }, [cartItem]);

  return (
    <td className="border px-4 py-2">
      {isInStock ? (
        <div className="cart-product-quantity flex items-center">
          <button
            onClick={() => handleDecreaseCart(cartItem)}
            className="px-2 py-1 bg-gray-200"
            disabled={cartItem.cartQuantity === 0}
          >
            -
          </button>
          <div className="count mx-2">{cartItem.cartQuantity}</div>
          <button
            onClick={() => handleAddToCart(cartItem)}
            className="px-2 py-1 bg-gray-200"
            disabled={cartItem.cartQuantity >= count}
          >
            +
          </button>
        </div>
      ) : (
        <p className="text-red-500">Out of Stock</p>
      )}
    </td>
  );
}

export default CountInStockCheak;
