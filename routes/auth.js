const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Login Route (No encryption, plain-text comparison)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the passwords match (plain-text comparison)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return success message with the user's role
    res.json({ message: 'Login successful', role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
