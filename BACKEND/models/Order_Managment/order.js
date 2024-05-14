const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    UserID: {
      type: Object,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    paymentOption: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
        // Add other details as needed
      },
    ],
    image: {
      type: Object,
    },
    deliveryStatus: {
      type: String,
      required: true,
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      required: true,
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
