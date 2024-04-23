const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const L_RequestSchema = new Schema({
  EmpID: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
  },

  Contact: {
    type: Number,
  },

  Destination: {
    type: String,
  },

  LDateF: {
    type: Date,
  },

  LdateT: {
    type: Date,
  },

  LType: {
    type: String,
  },

  Lduration: {
    type: String,
  },

  attachments: {
    type: Object,
  },

  remarks: {
    type: String,
  },

  //supervisor
  Sup_name: {
    type: String,
  },

  Sup_des: {
    type: String,
  },

  //employee who cover his part
  Backup: {
    type: String,
  },
});

const L_Request = mongoose.model("L_Request", L_RequestSchema);
module.exports = L_Request;
