const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8175;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {

    useNewUrlParser: true,
    //useCreateIndex: true,
   //useFindAndModify: false,
    useUnifiedTopology: true

})

const connection = mongoose.connection;
connection.once("open", ()=>{

    console.log("Mongodb connection ok");

})


const productRouter = require("./routes/Inventory_Management/products.js");
const LeaveRouter = require("./routes/Leave_Management/LeavesR.js");

app.use("/product",productRouter);
app.use("/Leave",LeaveRouter);

app.listen( PORT, ()=>{

    console.log(`Server is up and running on port: ${PORT} `);

})