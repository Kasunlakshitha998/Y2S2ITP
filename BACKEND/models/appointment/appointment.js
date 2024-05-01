const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    userId: { 
        type: String,
        required: true
    },   
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
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
    },
    image: {
        type: Object, 
        required: true,
    },
    approved: {
        type: Boolean,
        default: false
    }
    
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
