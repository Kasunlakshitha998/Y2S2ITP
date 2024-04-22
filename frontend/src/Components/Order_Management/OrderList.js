import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './../Nav/adminNav';
import { Link } from 'react-router-dom';
import {
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  //get all order list
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8175/order/'); // Fetch orders from the backend
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

 const handleDelete = (orderId) => { 
    axios
    .delete(`http://localhost:8175/order/delete/${orderId}`)
      .then(() => {
        alert("Order Delete successfully");
        setOrders(orders.filter((order) => order._id !== orderId));
        
         })
         .catch((error) => {          
           console.error('Error deleting product:', error);
           alert('Order Delete unSuccessfully');
     });
   }

  return (
    <>
      <header>
        <AdminNav />
      </header>
      <main className="plist ml-48">
        <h2>Order Details</h2>
        <div className="relative overflow-x-auto sm:rounded-lg flex flex-row justify-center">
          <table className="w-full text-sm text-left text-gray-900">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Delivery Address</th>

                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Payment Option</th>
                <th className="px-4 py-2">Deposit Slip</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">{order.UserID}</td>
                  <td className="border px-4 py-2">{order.deliveryAddress}</td>

                  <td className="border px-4 py-2">
                    <ul>
                      {order.items.map((item) => (
                        <li key={item._id}>
                          <p>Product Name: {item.productName}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Total Price: {item.totalPrice}</p>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2">{order.paymentOption}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={order.image}
                      alt={order.name}
                      style={{ width: '90px', height: '80px' }}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Link to={`/admin/order/editOrder/${order._id}`}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default OrderList;
