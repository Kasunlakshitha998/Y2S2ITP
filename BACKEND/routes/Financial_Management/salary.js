const express = require('express');
const Salary = require('../models/salary'); // Import Salary model

const router = express.Router();

//function to generate employee id
async function generateCustomId() {
  // Get the count of existing salary records
  const count = await Salary.countDocuments();
  
  // Generate the custom ID based on the count
  const customId = `EMP${(count + 1).toString().padStart(4, '0')}`; // EXP1, EXP2, EXP3, ...

  return customId;
}


//function to calculate net salary

function calculateNetSalary(baseSalary, otPayment, bonus, deduction) {
  const grossSalary = baseSalary + otPayment + bonus;
  const netSalary = grossSalary - deduction;
  return netSalary;
}


// Route to add a salary
router.post('/add', async (req, res) => {
  try {


    //calculate net salary
    const netSalary = calculateNetSalary(req.body.base_salary, req.body.ot_payment, req.body.bonus, req.body.deduction);
  
    //generate id for the record
    const customId = await generateCustomId();

    const newSalary = new Salary({...req.body,employee_id:customId,net_salary:netSalary});
    await newSalary.save();
    res.status(201).json({ message: 'Salary added successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding salary' });
  }
});

// Route to display all salaries
router.get('/', async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.status(200).json(salaries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching salaries' });
  }
});

// Route to update an exsiting record
router.route("/update/:employee_id").put(async (req, res) => {
  let employeeId = req.params.employee_id;
  const {name,position,base_salary,ot_payment,bonus,deduction,/*net_salary doubt should concern*/pay_period} = req.body;

  //calculate net salary
  const netSalary = calculateNetSalary(req.body.base_salary, req.body.ot_payment, req.body.bonus, req.body.deduction);

  const updateSalary = {
    name,
    position,
    base_salary,
    ot_payment,
    bonus,
    deduction,
    net_salary:netSalary,
    pay_period
  }

  const update = await Salary.updateOne({employee_id:employeeId},updateSalary)
  .then(()=>{
      res.status(200).send({status: "Record Updated"})
      .catch((err)=>{
          console.log(err);
          res.status(500).send({status: "Error Occured while Updating"});
      })
  })
})


// Route to delete an salary record
router.route("/delete/:employee_id").delete(async (req, res) => {
  try {
    const employeeId = req.params.employee_id;

    // Validation for employee_id
    const validExpenseId = /^EMP\d{4}$/; // Regex to match format "EXP1234"
    if (!validExpenseId.test(employeeId)) {
      res.status(400).json({ message: "Invalid employee ID format" });
      return;
    }

    // Delete using the custom expense_id
    const deleteResult = await Salary.deleteOne({ employee_id:employeeId });

    if (deleteResult.deletedCount > 0) {
      res.status(200).send({ status: "Record Deleted" });
    } else {
      res.status(404).json({ message: "Salary record not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error Occurred while Deleting" });
  }
});


module.exports = router;
