const express = require("express");
const User = require("../models/User");
const Task = require("../models/Task");

const router = express.Router();

// Middleware to check if user is an admin
const authenticateAdmin = (req, res, next) => {
  // Here we assume that the logged-in user's role is available on `req.user.role`.
  // You can use a session or a simple login flag to check the user's role.
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }
  next();
};

// Admin: Get All Users
router.get("/users", authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Admin: Assign Task to User
router.post("/tasks", authenticateAdmin, async (req, res) => {
  const { description, assignedTo } = req.body;

  try {
    const user = await User.findById(assignedTo);
    if (!user) return res.status(404).json({ error: "User not found" });

    const task = new Task({ description, assignedTo });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to assign task" });
  }
});

// Admin: Get All Tasks
router.get("/tasks", authenticateAdmin, async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "email role");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

module.exports = router;
