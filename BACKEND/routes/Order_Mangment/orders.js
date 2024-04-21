const express = require('express');
const router = express.Router();
const Order = require('../../models/Order_Managment/order');


// Create a new order
router.post('/add', async (req, res) => {
  try {
    const { UserID, deliveryAddress, paymentOption, items } = req.body;

    // Create a new order
    const order = new Order({
      UserID,
      deliveryAddress,
      paymentOption,
      items,
    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Fetch all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Fetch orders and sort by createdAt descending
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

module.exports = router;
