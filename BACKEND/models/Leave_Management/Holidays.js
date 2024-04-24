//holiday schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HolidaysSchema = new Schema({
  Date: {
    type: Date,
  },

  Hname: {
    type: String,
  },

  Description: {
    type: String,
  },
});

const Holidays = mongoose.model("Holidays", HolidaysSchema);
module.exports = Holidays;
