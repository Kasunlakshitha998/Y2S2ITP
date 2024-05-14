//Lookups schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LookupsSchema = new Schema({
  LookupsT: {
    type: String,
    required: true,
  },

  LookupN: {
    type: String,
    required: true,
  },
});

const Lookups = mongoose.model("Lookups", LookupsSchema);
module.exports = Lookups;
