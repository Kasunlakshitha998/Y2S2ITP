//Lsetup Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LSetupSchema = new Schema({
  setupType: {
    type: String,
    
  },

  company: {
    type: String,
    
  },

  duration: {
    type: Number,
  },

  maxCarryForward: {
    type: Number,
  },
});

const Lsetup = mongoose.model("Lsetup", LSetupSchema);
module.exports = Lsetup;
