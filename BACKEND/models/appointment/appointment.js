const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    name: {
        type : String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type:String,
        required: true
    }

   
})

const appointment = mongoose.model("appointment",appointmentSchema )

module.exports = appointment;