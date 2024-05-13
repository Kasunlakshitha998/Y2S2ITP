const express = require('express');
const router = express.Router();
const Feedback = require("../../models/feedback_management/feedback");

// Add feedback
router.post("/add", (req, res) => {
    const { productId, userId, name, email, rating, feedbackType, descript, satisfaction, recommend, purchaseAgain } = req.body;

    const newFeedback = new Feedback({
        productId,
        userId,
        name,
        email,
        rating,
        feedbackType,
        descript,
        satisfaction,
        recommend,
        purchaseAgain
    });

    newFeedback.save()
        .then(() => res.json("Feedback Added"))
        .catch((err) => res.status(400).json("Error: " + err));
})

// Get all feedback
router.get("/", (req, res) => {
    Feedback.find()
        .then((feedbacks) => res.json(feedbacks))
        .catch((err) => res.status(400).json("Error: " + err));
});

// Update feedback
router.put('/update/:id', async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const { date, email, rating, feedbackType, descript, satisfaction, recommend, purchaseAgain } = req.body;

    const updateFeedback = {
      date,
      email,
      rating,
      feedbackType,
      descript,
      satisfaction,
      recommend,
      purchaseAgain
    };

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      updateFeedback,
      { new: true }
    );

    res.status(200).json({ status: 'Feedback Updated', feedback: updatedFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error with updating data', error: error.message });
  }
});

// Delete feedback
router.delete('/delete/:id', async (req, res) => {
    const feedbackId = req.params.id;
    await Feedback.findByIdAndDelete(feedbackId)
        .then(() => res.status(200).send({ status: 'Feedback deleted' }))
        .catch((err) => res.status(500).send({ status: "Error with deleting feedback", error: err.message }));
});

// Get feedback by ID
router.get("/get/:id", async (req, res) => {
    const feedbackId = req.params.id;
    await Feedback.findById(feedbackId)
        .then((feedback) => res.status(200).send({ status: 'Feedback fetched', feedback }))
        .catch((err) => res.status(500).send({ status: 'Error with fetching feedback', error: err.message }));
});

module.exports = router;
