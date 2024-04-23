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

router.route("/update/:id").put(async (req, res)=>{

    let feedbackId = req.params.id;
    const { productId, userId, date, name, email, rating, feedbackType,descript } = req.body;

    const updateFeedback = {
      productId,
      userId,
      date,
      name,
      email,
      rating,
      feedbackType,
      descript
    };

    const update = await Feedback.findByAndUpdate(feedbackId, updateFeedback)
    .then(() => {

    res.status(200).send({status: "Feedback Updated", feedback: update})
    }).catch((err)=>{
   console.log(err);
   res.status(500).send({status: "Error with updating data",error:err.message}); 
    })
})

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