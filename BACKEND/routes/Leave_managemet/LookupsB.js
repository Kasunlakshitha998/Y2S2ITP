const router = require('express').Router();
const Lookups = require('../../models/Leave_Management/Lookups');

router.post('/create', async (req, res) => {
  try {
    const LookupsT = req.body.LookupsT; // Corrected field name
    const LookupN = req.body.LookupN;

    const newLookups = new Lookups({
      LookupsT,
      LookupN,
    });

    await newLookups.save();
    res.json({ message: 'Lookup created successfully' });
  } catch (error) {
    console.error('Error creating lookup:', error);
    res.status(500).json({ error: 'Failed to create lookup' });
  }
});

router.get('/', (req, res) => {
  Lookups.find()
    .then((lookups) => {
      res.json(lookups);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to fetch lookups' }); 
    });
});



// Update lookup
router.put('/update/:id', async (req, res) => {
  let id = req.params.id;
  const { LookupsT, LookupN } = req.body;

  const updateLookups = {
    LookupsT,
    LookupN,
  };

  try {
    const updatedLookups = await Lookups.findByIdAndUpdate(id, updateLookups, {
      new: true,
    });
    if (!updatedLookups) {
      return res.status(404).json({ error: 'Lookup not found' });
    }
    res.status(200).json({ status: 'Lookup updated', Lookups: updatedLookups });
  } catch (error) {
    console.error('Error updating lookup:', error);
    res.status(500).json({ error: 'Failed to update lookup' });
  }
});

// Delete lookup
router.delete('/delete/:id', async (req, res) => {
  let lookupId = req.params.id;

  try {
    const deletedLookup = await Lookups.findByIdAndDelete(lookupId);
    if (!deletedLookup) {
      return res.status(404).json({ error: 'Lookup not found' });
    }
    res.status(200).json({ status: 'Lookup deleted' });
  } catch (error) {
    console.error('Error deleting lookup:', error);
    res.status(500).json({ error: 'Failed to delete lookup' });
  }
});

module.exports = router;
