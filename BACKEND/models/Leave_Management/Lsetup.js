const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LSetupSchema = new Schema({
  SetupT: {
    type: String,
    enum: ["Company", "individual"],
  },

  Company: {
    type: String,
    enum: ["Annual", "Casual", "Offical"],
  },

  Duration: {
    type: Number,
  },

  Max_CarryF: {
    type: Number,
  },
});

const Lsetup = mongoose.model("Lsetup", LSetupSchema);
module.exports = Lsetup;
