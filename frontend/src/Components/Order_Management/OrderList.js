import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './../Nav/adminNav';


const OrderList = () => {
  const [orders, setOrders] = useState([]);

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

  return (
    <>
      <header>
        <AdminNav />
      </header>
      <main className="plist ml-48">
        <h2>Order Details</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Delivery Address</th>
                <th className="px-4 py-2">Payment Option</th>
                <th className="px-4 py-2">Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">{order.UserID}</td>
                  <td className="border px-4 py-2">{order.deliveryAddress}</td>
                  <td className="border px-4 py-2">{order.paymentOption}</td>
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
