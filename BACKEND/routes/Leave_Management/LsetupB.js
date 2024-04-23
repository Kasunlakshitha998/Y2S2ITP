const router = require("express").Router();
const Lsetup = require("../../models/Leave_Management/Lsetup");

router.post("/create", async (req, res) => {
  try {
    const SetupT = req.body.SetupT; // Corrected field name
    const Company = req.body.Company;
    const Duration = req.body.Duration;
    const Max_CarryF = req.body.Max_CarryF;

    const newLsetup = new Lsetup({
      SetupT,
      Company,
      Duration,
      Max_CarryF,
    });

    await newLsetup.save();
    res.json({ message: "Leave setup created successfully" });
  } catch (error) {
    console.error("Error creating Holiday:", error);
    res.status(500).json({ error: "Failed to create Leave Setup" });
  }
});

router.route("/").get((req, res) => {
  Lsetup.find()
    .then((Lsetup) => {
      res.json(Lsetup);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update product
router.route("/update/:id").put(async (req, res) => {
  //get product id
  let id = req.params.id;
  const { SetupT, Company, Duration, Max_CarryF } = req.body;

  const updateLsetup = {
    SetupT,
    Company,
    Duration,
    Max_CarryF,
  };

  const update = await Lsetup.findByIdAndUpdate(id, updateLsetup, {
    new: true,
  })
    .then((Lsetup) => {
      res.status(200).send({ status: "Leave setup update", Lsetup });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updatind data" });
    });
});

//Delete product
router.route("/delete/:id").delete(async (req, res) => {
  let Lsetup_id = req.params.id;

  await Lsetup.findByIdAndDelete(Lsetup_id)
    .then(() => {
      res.status(200).send({ status: "Product Delete" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with delete Holidays", error: err.message });
    });
});

module.exports = router;
