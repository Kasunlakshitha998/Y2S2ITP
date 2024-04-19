const express = require('express');
const Expense = require('../../models/Financial_Management/expense'); // Import Expense model
const bodyParser = require('body-parser');

//const mongoose = require('mongoose');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

async function generateCustomId() {
  let isUnique = false;
  let customId;

  while (!isUnique) {
    // Generate the custom ID based on the count
    customId = `EXP${(await Expense.countDocuments() + 1).toString().padStart(6, '0')}`; // EXP1, EXP2, EXP3, ...

    // Check if the generated expense_id already exists in the database
    const existingExpense = await Expense.findOne({ expense_id: customId });

    if (!existingExpense) {
      isUnique = true;
    }
  }

  return customId;
}

// Route to add an expense
router.post('/add', async (req, res) => {
  try {
    const customId = await generateCustomId();
    
    console.log('Received date:', req.body.date);
    const dateOnly = new Date(req.body.date).toISOString().split('T')[0];

    const newExpense = new Expense({...req.body, date: dateOnly, expense_id: customId});
    
    await newExpense.save();
    
    res.status(201).json({ message: 'Expense added successfully!' });
  } catch (err) {
    if (err.code === 11000) { // MongoDB duplicate key error code
      res.status(400).json({ message: 'Duplicate expense_id. Please try again.' });
    } else {
      console.error(err);
      res.status(500).json({ message: 'Error adding expense' });
    }
  }
});

// Route to display all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({expense_id:-1});
    res.status(200).json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});
 

// Route to update an exsiting record

router.route("/update/:expense_id").put(async (req, res) => {
  try {
      let expenseId = req.params.expense_id;
      const { date, category, amount, payment_method, description, receipt_no, name, location } = req.body;
      console.log('Received date:', req.body.date);
      const dateOnly = new Date(req.body.date).toISOString().split('T')[0];
      const updateExpense = {
          date: dateOnly,
          category,
          amount,
          payment_method,
          description,
          receipt_no,
          name,
          location
      }

      const update = await Expense.updateOne({ expense_id: expenseId }, updateExpense);
      res.status(200).send({ status: "Record Updated" });
  } catch (err) {
      console.log(err);
      res.status(500).send({ status: "Error Occurred while Updating" });
  }
});


// Route to delete an expense
router.route("/delete/:expense_id").delete(async (req, res) => {
    try {
      const expenseId = req.params.expense_id;

      // Delete using the custom expense_id
      const deleteResult = await Expense.deleteOne({ expense_id:expenseId });
  
      if (deleteResult.deletedCount > 0) {
        res.status(200).send({ status: "Record Deleted" });
      } else {
        res.status(404).json({ message: "Expense not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ status: "Error Occurred while Deleting" });
    }
  });
  
  //route display only one record
  router.route("/get/:expense_id").get(async (req, res) => {
    let expenseId = req.params.expense_id;
    const expense = await Expense.findOne({ expense_id: expenseId })
       .then(expense => {
         res.status(200).send({ status: "Expense fetched", expense });
       })
       .catch(err => {
         console.log(err.message);
         res.status(500).send({ status: "Error with fetching data", error: err.message });
       });
   });
   

module.exports = router;
