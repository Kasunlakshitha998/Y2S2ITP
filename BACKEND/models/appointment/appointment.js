const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    name: { 
        type : String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    telephone:{
        type:Number,
        required: true
    },
    phoneType:{
        type: String,
        required: true
    },
    serviceType:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    reciept:{
        type:File,
        required: true
    }
})

const appointment = mongoose.model("appointment",appointmentSchema )

module.exports = appointment;