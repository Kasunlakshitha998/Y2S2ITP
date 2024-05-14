const router = require('express').Router();
const Holidays = require('../../models/Leave_Management/Holidays.js');

// Create a new holiday
router.post('/create', async (req, res) => {
  try {
    const { date, holidayName, description } = req.body;

    const newHoliday = new Holidays({
      date,
      holidayName,
      description,
    });

    await newHoliday.save();
    res.json({ message: 'Holiday created successfully' });
  } catch (error) {
    console.error('Error creating holiday:', error);
    res.status(500).json({ error: 'Failed to create holiday' });
  }
});

// Get all holidays
router.get('/', async (req, res) => {
  try {
    const holidays = await Holidays.find();
    res.json(holidays);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    res.status(500).json({ error: 'Failed to fetch holidays' });
  }
});

// Update a holiday by ID
router.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  const { date, holidayName, description } = req.body;

  const updateHoliday = {
    date,
    holidayName,
    description,
  };

  try {
    const updatedHoliday = await Holidays.findByIdAndUpdate(id, updateHoliday, {
      new: true,
    });

    if (!updatedHoliday) {
      return res.status(404).json({ status: 'Holiday not found' });
    }

    res
      .status(200)
      .json({ status: 'Holiday updated', holiday: updatedHoliday });
  } catch (error) {
    console.error('Error updating holiday:', error);
    res.status(500).json({ status: 'Error updating holiday' });
  }
});

// Delete a holiday by ID
router.delete('/delete/:id', async (req, res) => {
  const holidayId = req.params.id;

  try {
    const deletedHoliday = await Holidays.findByIdAndDelete(holidayId);

    if (!deletedHoliday) {
      return res.status(404).json({ status: 'Holiday not found' });
    }

    res.status(200).json({ status: 'Holiday deleted' });
  } catch (error) {
    console.error('Error deleting holiday:', error);
    res.status(500).json({ status: 'Error deleting holiday' });
  }
});

module.exports = router;
