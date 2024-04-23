// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    // Your initial state here
  },
  reducers: {
    // Existing reducers

    generateReport: (state, action) => {
      const appointments = state.appointments; // Assuming your state structure includes appointments
      const csvContent = "data:text/csv;charset=utf-8,";
      
      // Adding column headers
      const headers = ["Name", "Email", "Telephone", "Phone Type", "Service Type", "Date", "Description"];
      csvContent += headers.join(",") + "\n";
      
      // Adding appointment data
      appointments.forEach((appointment) => {
        const row = [
          appointment.name,
          appointment.email,
          appointment.telephone,
          appointment.phoneType,
          appointment.serviceType,
          appointment.date,
          appointment.description
        ];
        csvContent += row.join(",") + "\n";
      });
      
      // Create a CSV file
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "appointment_report.csv");
      document.body.appendChild(link); // Required for Firefox
      link.click();
    },
  },
});

export const { generateReport } = cartSlice.actions;

export default cartSlice.reducer;
