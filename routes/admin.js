const express = require("express");
const User = require("../models/User");
const Task = require("../models/Task");

const router = express.Router();

const authenticateAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }
  next();
};

router.get("/users", authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

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

router.get("/tasks", authenticateAdmin, async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "email role");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

module.exports = router;
