const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  rating: {
    type: Number,
  },
  feedbackType: {
    type: String,
    required: true,
  },
  descript: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model("Feedback",feedbackSchema);

module.exports = Feedback;