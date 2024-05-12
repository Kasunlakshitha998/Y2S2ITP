const router = require("express").Router();
const L_Request = require("../../models/Leave_Management/L_Request");

// Create a leave request
router.post("/create", async (req, res) => {
  try {
    const {
      EmpID,
      name,
      Email,
      Contact,
      Destination,
      LDateF,
      LdateT,
      LType,
      Lduration,
      attachments,
      remarks,
      Sup_name,
      Sup_des,
      Backup,
    } = req.body;

    const newLeaveRequest = new L_Request({
      EmpID,
      name,
      Email,
      Contact,
      Destination,
      LDateF,
      LdateT,
      LType,
      Lduration,
      attachments,
      remarks,
      Sup_name,
      Sup_des,
      Backup,
    });

    await newLeaveRequest.save();
    res.json({ message: "Leave request created successfully" });
  } catch (error) {
    console.error("Error creating leave request:", error);
    res.status(500).json({ error: "Failed to create leave request" });
  }
});

module.exports = router;

// Create a leave request
router.post("/create", async (req, res) => {
  try {
    const newLeaveRequest = new L_Request(req.body);
    const savedLeaveRequest = await newLeaveRequest.save();
    res.status(201).json(savedLeaveRequest); // Send back the saved leave request object
  } catch (error) {
    console.error("Error creating leave request:", error);
    res.status(500).json({ error: "Failed to create leave request" });
  }
});

// Get all leave requests
router.get("/", async (req, res) => {
  try {
    const leaveRequests = await L_Request.find();
    res.json(leaveRequests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ error: "Failed to fetch leave requests" });
  }
});

// Get a single leave request by ID
router.get("/:id", async (req, res) => {
  try {
    const leaveRequest = await L_Request.findById(req.params.id);
    if (!leaveRequest) {
      return res.status(404).json({ error: "Leave request not found" });
    }
    res.json(leaveRequest);
  } catch (error) {
    console.error("Error fetching leave request:", error);
    res.status(500).json({ error: "Failed to fetch leave request" });
  }
});

// Update a leave request by ID
router.put("/update/:id", async (req, res) => {
  try {
    const updatedLeaveRequest = await L_Request.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLeaveRequest) {
      return res.status(404).json({ error: "Leave request not found" });
    }
    res.json(updatedLeaveRequest);
  } catch (error) {
    console.error("Error updating leave request:", error);
    res.status(500).json({ error: "Failed to update leave request" });
  }
});

// Delete a leave request by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedLeaveRequest = await L_Request.findByIdAndDelete(
      req.params.id
    );
    if (!deletedLeaveRequest) {
      return res.status(404).json({ error: "Leave request not found" });
    }
    res.json({ message: "Leave request deleted successfully" });
  } catch (error) {
    console.error("Error deleting leave request:", error);
    res.status(500).json({ error: "Failed to delete leave request" });
  }
});

module.exports = router;
