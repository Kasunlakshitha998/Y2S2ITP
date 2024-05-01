// Import necessary modules
const express = require('express');
const router = express.Router();
const Appointment = require('../../models/appointment/appointment');

// Create operation (Create a new appointment)
router.route('/add').post((req, res) => {
  // Extract data from request body
  const { userId, name, email, telephone, phoneType, serviceType, date, description, image } =
    req.body;

  // Create a new appointment object
  const newAppointment = new Appointment({
    name,
    userId,
    email,
    telephone,
    phoneType,
    serviceType,
    date,
    description,
    image
  });

  // Save the new appointment to the database
  newAppointment
    .save()
    .then(() => {
      res.json({ message: 'Appointment added successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// Read operation (Get all appointments)
router.get('/', (req, res) => {
  Appointment.find()
    .then((appointments) => {
      res.json(appointments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// Update operation (Update an existing appointment)
router.put('/update/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email, telephone, phoneType, serviceType, date, description, image } =
    req.body;

  const updateAppointment = {
    name,
    email,
    telephone,
    phoneType,
    serviceType,
    date,
    description,
    image
  };

  // Update the appointment by ID
  try {
    await Appointment.findByIdAndUpdate(userId, updateAppointment);
    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete operation (Delete an appointment)
router.delete('/delete/:id', async (req, res) => {
  const appointmentId = req.params.id;

  try {
    await Appointment.findByIdAndDelete(appointmentId);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Get operation (Get a specific appointment by ID)
router.get('/get/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const appointment = await Appointment.findById(userId);
    if (!appointment) {
      res.status(404).json({ error: 'Appointment not found' });
    } else {
      res.status(200).json({ message: 'Appointment fetched successfully', appointment });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Approve operation (Approve an appointment)
router.put('/approve/:id', async (req, res) => {
  const appointmentId = req.params.id;

  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Update the appointment's approved field to true
    appointment.approved = true;

    // Save the updated appointment
    await appointment.save();

    res.status(200).json({ message: 'Appointment approved successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Cancel Approval operation (Cancel approval of an appointment)
router.put('/cancelApproval/:id', async (req, res) => {
  const appointmentId = req.params.id;

  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Update the appointment's approved field to false
    appointment.approved = false;

    // Save the updated appointment
    await appointment.save();

    res.status(200).json({ message: 'Approval cancelled successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
