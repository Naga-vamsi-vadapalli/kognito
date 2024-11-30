const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

const authenticateUser = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  next();
};

router.get("/my-tasks", authenticateUser, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

module.exports = router;
