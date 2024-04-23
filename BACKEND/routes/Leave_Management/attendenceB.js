const express = require("express");
const router = express.Router();
const employee = require("../../models/");
const QRCode = require("qrcode");

const fs = require("fs");

// Sample employee data
// const employees = [
//   { id: "emp001", name: "John Doe" },
//   { id: "emp002", name: "Jane Smith" },
//   // Add more employee data as needed
// ];

// Generate and save QR codes for each employee
// employees.forEach((employee) => {
//   const qrCodeData = JSON.stringify(employee);
//   QRCode.toFile(`qr_codes/${employee.id}.png`, qrCodeData, (err) => {
//     if (err) {
//       console.error("Error generating QR code:", err);
//     } else {
//       console.log(`QR code generated for ${employee.name}`);
//     }
//   });
// });
module.exports = router;
