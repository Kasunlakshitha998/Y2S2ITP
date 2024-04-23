import React, { useState } from "react";
import axios from 'axios';

export default function GiveFeedback() {
    const [feedbackType, setFeedbackType] = useState("");
    const [descript, setDescription] = useState("");

    const sendData = (e) => {
        e.preventDefault();

        const newFeedback = {
            productId: "sampleProductId", // Replace with actual productId
            userId: "sampleUserId", // Replace with actual userId
            name: "John Doe", // Replace with actual name
            email: "john@example.com", // Replace with actual email
            rating: 5, // Replace with actual rating
            feedbackType,
            descript
        }

        axios.post("http://localhost:8175/feedback/add", newFeedback)
            .then(() => {
                alert("Feedback Successfully Submitted");
                setDescription("");
                setFeedbackType("");
            })
            .catch((err) => {
                alert("Error submitting feedback");
                console.error(err);
            });
    }

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <h2>Give your feedback</h2>

                <div className="form-group">
                    <label htmlFor="feedbackType">Feedback Type:</label>
                    <select
                        id="feedbackType"
                        name="feedbackType"
                        className="form-control"
                        value={feedbackType}
                        onChange={(e) => setFeedbackType(e.target.value)}
                    >
                        <option value="">Select Feedback Type</option>
                        <option value="Product">Product</option>
                        <option value="Repair Services">Repair Services</option>
                        <option value="Delivery Services">Delivery Services</option>
                        <option value="Promotional">Promotional</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={descript}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
