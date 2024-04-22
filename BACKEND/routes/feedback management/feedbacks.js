const express = require('express');
const router = express.Router();
const Feedback = require('../../models/feedback_management/feedback');

router.route("/add").post((req,res)=>{

    const productId = req.body.productId;
    const date = req.body.date;
    const name = req.body.name;
    const email = req.body.email;
    const rating = Number (req.body.rating);
    const feedbackType = req.body.feedbackType;
    const descript = req.body.descript;
    

// give new feedback
    const newFeedback = new Feedback({
      
      date,
      name,
      email,
      rating,
      feedbackType,
      descript
      
    });

    // Save the new feedback to the database
    newFeedback.save().then(()=>{
        res.json("Feedback Submitted successfully")
    }).catch((err)=>{
        console.log(err);
    })



})

// Read operation (Get all feedbacks)
router.route("/").get((req,res)=>{

    Feedback.find().then((feedbacks)=>{
        res.json(feedbacks)
    }).catch((err)=>{
        console.log(err);
    })

})

// Update operation
router.route("/update/:id").put(async (req, res)=>{

    let feedbackId = req.params.id;
    const { productId, date, name, email, rating, feedbackType,descript} = req.body;

    const updateFeedback = {
      
      date,
      name,
      email,
      rating,
      feedbackType,
      descript
      
    };

    // Update the appointment by ID
  try {
    await Feedback.findByIdAndUpdate(userId, updateFeedback);
    res.status(200).json({ message: 'Feedback updated successfully' }); // Adjusted response message format
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message }); // Adjusted response status and error message
  }
});

// Delete operation
router.route("/delete/:id").delete(async (req, res) => {
    let feedbackId = req.params.id;

    await Feedback.findByIdAndDelete(feedbackId)
    .then(() => {
        res.status(200).send({ status: 'feedback deleted' });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete feedback",error:err.message})
    })
})

router.route("/get/:id").get(async (req,res) => {
    let feedbackId = req.params.id;
    await Feedback.findById(feedbackId)
      .then((feedback) => {
        res.status(200).send({ status: 'Feedback fetched', feedback });
      })
      .catch(() => {
        console.log(err.message);
        res
          .status(500)
          .send({ status: 'Error with get user', error: err.message });
      });
})


module.exports = router;
