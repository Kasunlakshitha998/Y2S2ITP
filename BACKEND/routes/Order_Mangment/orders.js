const express = require('express');
const router = express.Router();
const Order = require('../../models/Order_Managment/order');


// Create a new order
router.post('/add', async (req, res) => {
  try {
    const { UserID, deliveryAddress, paymentOption, items, image } = req.body;

    // Create a new order
    const order = new Order({
      UserID,
      deliveryAddress,
      paymentOption,
      items,
      image,
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

//delete
router.route('/delete/:id').delete(async (req, res) => {
  let orderId = req.params.id;

  await Order.findByIdAndDelete(orderId)
    .then(() => {
      res.status(200).send({ status: 'Order Delete' });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: 'Error with delete Order', error: err.message });
    });
});

//edit order
router.put('/edit/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { deliveryAddress, paymentOption } = req.body;

    // Find the order by its ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order fields
   
    order.deliveryAddress = deliveryAddress;
    order.paymentption = paymentOption;


    // Save the updated order to the database
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//get one order
router.get('/getOrder/:id', async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by its ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
