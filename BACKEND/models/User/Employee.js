const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    reenterpassword: String,
    number: Number,
    isAdmin: {
        type: Boolean,
        default: false
    },
    otp: String // Add a field to store OTP
});

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = EmployeeModel;
