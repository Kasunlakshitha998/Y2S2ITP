const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HolidaysSchema = new Schema({
  date: {
    type: Date,
  },

  holidayName: {
    type: String,
  },

  description: {
    type: String,
  },
});

const Holidays = mongoose.model("Holidays", HolidaysSchema);
module.exports = Holidays;
