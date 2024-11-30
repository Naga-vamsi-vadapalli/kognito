const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Middleware to authenticate User
const authenticateUser = (req, res, next) => {
  // Here we assume that the logged-in user's ID is available on `req.user.id`.
  // You can use sessions or another method to track logged-in users.
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
};

// User: Get Assigned Tasks
router.get("/my-tasks", authenticateUser, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

module.exports = router;
