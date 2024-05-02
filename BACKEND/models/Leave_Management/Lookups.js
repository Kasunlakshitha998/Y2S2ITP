//Lookups schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LookupsSchema = new Schema({
  LookupsT: {
    type: String,
    enum: ["Annual Leave", "Casual Leave", "Official Leave"],
  },

  LookupN: {
    type: String,
  },
});

const Lookups = mongoose.model("Lookups", LookupsSchema);
module.exports = Lookups;
