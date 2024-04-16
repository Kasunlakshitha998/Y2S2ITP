const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    feedbackId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
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
    rating: {
        type: Number,
        required: true
    },
    feedbackType: {
        type: String,
        required: true
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
