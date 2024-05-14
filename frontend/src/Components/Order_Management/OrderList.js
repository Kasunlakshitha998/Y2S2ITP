import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './../Nav/adminNav';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8175/order/');
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
  };

  const handleGenerateReport = () => {
    html2canvas(document.querySelector("#order-table")).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgHeight = canvas.height * 208 / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, 208, imgHeight);
      pdf.save("orders_report.pdf");
    });
  };

  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <AdminNav />
      </header>
      <main className="plist ml-48">
        <div className="flex justify-between items-center">
          <div>
            <input
              type="text"
              placeholder="Search by Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-2xl my-4 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <button onClick={handleGenerateReport} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Generate Report
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg flex flex-row justify-center">
          <table id="order-table" className="max-w-3xl text-sm text-left text-gray-900">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Delivery Address</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Payment Option</th>
                <th className="px-4 py-2">Deposit Slip</th>
                <th className="px-4 py-2">Delivery Status</th>
                <th className="px-4 py-2">Payment Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">{order.deliveryAddress}</td>
                  <td className="border px-4 py-2">{order.number}</td>
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
                    {order.image ? (
                      <img
                        src={order.image}
                        alt={order.name}
                        style={{ width: '90px', height: '80px' }}
                      />
                    ) : (
                      <span>Cash</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">{order.paymentStatus}</td>
                  <td className="border px-4 py-2">{order.deliveryStatus}</td>
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
