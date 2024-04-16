const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8175;

// Middleware
app.use(
  cors()
);
app.use(bodyParser.json());
app.use(cookieParser());
// MongoDB connection
const URL = process.env.MONGODB_URL;
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
const productRouter = require('./routes/Inventory_Management/products.js');
const userRouter = require('./routes/User/Employees.js');
const feedbackRouter = require('./routes/feedbacks.js');

app.use('/product', productRouter);
app.use('/user', userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});