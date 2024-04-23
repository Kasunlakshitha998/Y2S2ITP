const express = require('express');
const router = express.Router();
const Feedback = require("../../models/feedback_management/feedback");

// Add feedback
router.post("/add", (req, res) => {
    const { productId, userId, name, email, rating, feedbackType, descript } = req.body;

    const newFeedback = new Feedback({
        productId,
        userId,
        name,
        email,
        rating,
        feedbackType,
        descript
    });

    newFeedback.save()
        .then(() => res.json("Feedback Added"))
        .catch((err) => res.status(400).json("Error: " + err));
})





router.route("/").get((req,res)=>{

    Feedback.find().then((feedbacks)=>{
        res.json(feedbacks)
    }).catch((err)=>{
        console.log(err);
    })

})

//http//localhost:8175/feedback/update/

router.put('/update/:id', async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const { date, email, rating, feedbackType, descript } = req.body;

    const updateFeedback = {
      date,
      email,
      rating,
      feedbackType,
      descript,
    };

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      updateFeedback,
      { new: true }
    );

    res
      .status(200)
      .json({ status: 'Feedback Updated', feedback: updatedFeedback });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: 'Error with updating data', error: error.message });
  }
});

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