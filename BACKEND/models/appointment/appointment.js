const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    phoneType: {
        type: [String], // Change type to an array of strings
        required: true
    },
    serviceType: {
        type: [String], // Change type to an array of strings
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    }
    
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
