import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNav from './../Nav/userNav';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function UserOderList() {
  const [orders, setOrders] = useState([]);
  const userId = Cookies.get('userId');

  console.log(userId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8175/order/'); // Fetch all orders from the backend
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on the logged-in user's ID
  const userOrders = orders.filter((order) => order.UserID === userId);


  const handleDelete = (orderId) => {
    axios
      .delete(`http://localhost:8175/order/delete/${orderId}`)
      .then(() => {
        alert('Order Delete successfully');
        setOrders(orders.filter((order) => order._id !== orderId));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        alert('Order Delete unSuccessfully');
      });
  };

  return (
    <>
      <header>
        <UserNav />
      </header>
      <main className="mt-20">
        <h2>Order Details</h2>
        <div className="overflow-x-auto m-5">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Delivery Address</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Payment Option</th>
                <th className="px-4 py-2">Slip</th>
                <th className="px-4 py-2">Payment Status</th>
                <th className="px-4 py-2">Delivery Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">{order.deliveryAddress}</td>

                  <td className="border px-4 py-2">
                    <ul className="divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item._id} className="py-4">
                          <p className="text-lg font-semibold">
                            {item.productName}
                          </p>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-gray-600">
                            Total Price: {item.totalPrice}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2">{order.paymentOption}</td>
                  <td className="border px-4 py-2">
                    {order.paymentOption === 'bank' ? (
                      <img
                        src={order.image}
                        alt={order.paymentOption}
                        style={{ width: '200px', height: '200px' }}
                      />
                    ) : (
                      <p>Cash</p>
                    )}
                  </td>
                  <td className="border px-4 py-2">{order.paymentStatus}</td>
                  <td className="border px-4 py-2">{order.deliveryStatus}</td>
                  <td className="border px-4 py-2">
                    {order.deliveryStatus === 'Pending' && (
                      <td className="border px-4 py-2">
                        <Link to={`/order/userOderEdit/${order._id}`}>
                          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 m-2 rounded">
                            <FaEdit />
                          </button>
                        </Link>

                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 m-2 rounded"
                          onClick={() => handleDelete(order._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="continue-shopping mt-4">
          <Link to="/" className="flex items-center text-blue-500">
            <span>Continue Shopping</span>
          </Link>
        </div>
      </main>
    </>
  );
}

export default UserOderList;
