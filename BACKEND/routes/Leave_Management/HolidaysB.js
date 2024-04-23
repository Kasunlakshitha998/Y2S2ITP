const router = require("express").Router();
const Holidays = require("../../models/Leave_Management/Holidays");

router.post("/create", async (req, res) => {
  try {
    const Date = req.body.Date; // Corrected field name
    const Hname = req.body.Hname;
    const Description = req.body.Description;

    const newHolidays = new Holidays({
      Date,
      Hname,
      Description,
    });

    await newHolidays.save();
    res.json({ message: "Holiday created successfully" });
  } catch (error) {
    console.error("Error creating Holiday:", error);
    res.status(500).json({ error: "Failed to create Holiday" });
  }
});

router.route("/").get((req, res) => {
  Holidays.find()
    .then((Holidays) => {
      res.json(Holidays);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update product
router.route("/update/:id").put(async (req, res) => {
  //get product id
  let id = req.params.id;
  const { Date, Hname, Description } = req.body;

  const updateHolidays = {
    Date,
    Hname,
    Description,
  };

  const update = await Holidays.findByIdAndUpdate(id, updateHolidays, {
    new: true,
  })
    .then((Holidays) => {
      res.status(200).send({ status: "Holiday update", Holidays });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updatind data" });
    });
});

//Delete product
router.route("/delete/:id").delete(async (req, res) => {
  let Holidays_id = req.params.id;

  await Holidays.findByIdAndDelete(Holidays_id)
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
