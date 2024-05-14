const router = require('express').Router();
const Lsetup = require('../../models/Leave_Management/Lsetup');

// Create a new leave setup
router.post('/create', async (req, res) => {
  try {
    const { setupType, company, duration, maxCarryForward } = req.body;

    const newLsetup = new Lsetup({
      setupType,
      company,
      duration,
      maxCarryForward,
    });

    await newLsetup.save();
    res.json({ message: 'Leave setup created successfully' });
  } catch (error) {
    console.error('Error creating leave setup:', error);
    res.status(500).json({ error: 'Failed to create leave setup' });
  }
});

// Get all leave setups

router.get('/', (req, res) => {
  Lsetup.find()
    .then((setups) => {
      res.json(setups);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to fetch setups' });
    });
});



// Update a leave setup by ID
router.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  const { setupType, company, duration, maxCarryForward } = req.body;

  const updateLsetup = {
    setupType,
    company,
    duration,
    maxCarryForward,
  };

  try {
    const updatedLsetup = await Lsetup.findByIdAndUpdate(id, updateLsetup, {
      new: true,
    });

    if (!updatedLsetup) {
      return res.status(404).json({ status: 'Leave setup not found' });
    }

    res
      .status(200)
      .json({ status: 'Leave setup updated', Lsetup: updatedLsetup });
  } catch (error) {
    console.error('Error updating leave setup:', error);
    res.status(500).json({ status: 'Error updating leave setup' });
  }
});

// Delete a leave setup by ID
router.delete('/delete/:id', async (req, res) => {
  const setupId = req.params.id;

  try {
    const deletedSetup = await Lsetup.findByIdAndDelete(setupId);

    if (!deletedSetup) {
      return res.status(404).json({ status: 'Leave setup not found' });
    }

    res.status(200).json({ status: 'Leave setup deleted' });
  } catch (error) {
    console.error('Error deleting leave setup:', error);
    res.status(500).json({ status: 'Error deleting leave setup' });
  }
});

module.exports = router;
