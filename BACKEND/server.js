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
app.use(express.json({ extended: false, limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 })
);
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
//const express = require('express');
const path = require('path');

//const nodemailer = require('nodemailer');
//const app = express();








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
const appointmentRouter = require("./routes/appointment/appointments.js");



app.use(express.static('uploads/images'));
app.use(express.json());

app.use('/product', productRouter);//Product
app.use('/user', userRouter);//User
app.use('/appointment', appointmentRouter);//Appointment 
//order
app.use('/feedback',feedbackRouter);//feedback 
//leave
//promotion
//financial
//payment

// Start server
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});