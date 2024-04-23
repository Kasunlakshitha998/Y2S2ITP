const router = require("express").Router();
const Lookups = require("../../models/Leave_Management/Lookups");

router.post("/create", async (req, res) => {
  try {
    const LookupsT = req.body.LookupsT; // Corrected field name
    const LookupN = req.body.LookupN;

    const newLookups = new Lookups({
      LookupsT,
      LookupN,
    });

    await newLookups.save();
    res.json({ message: "Lookup created successfully" });
  } catch (error) {
    console.error("Error creating lookup:", error);
    res.status(500).json({ error: "Failed to create lookup" });
  }
});

router.route("/").get((req, res) => {
  Lookups.find()
    .then((Lookups) => {
      res.json(Lookups);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update product
router.route("/update/:id").put(async (req, res) => {
  //get product id
  let id = req.params.id;
  const { LookupsT, LookupN } = req.body;

  const updateLookups = {
    LookupsT,
    LookupN,
  };

  const update = await Lookups.findByIdAndUpdate(id, updateLookups, {
    new: true,
  })
    .then((Lookups) => {
      res.status(200).send({ status: "Lookups update", Lookups });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updatind data" });
    });
});

//Delete product
router.route("/delete/:id").delete(async (req, res) => {
  let Lookups_id = req.params.id;

  await Lookups.findByIdAndDelete(Lookups_id)
    .then(() => {
      res.status(200).send({ status: "Product Delete" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with delete product", error: err.message });
    });
});

module.exports = router;
