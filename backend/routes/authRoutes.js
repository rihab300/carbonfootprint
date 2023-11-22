const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, first_name, last_name } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password_hash: hashedPassword,
      first_name,
      last_name,
      created_at: new Date(),
      updated_at: new Date()
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Login Route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', 
  failureRedirect: '/login',     
  failureFlash: true             
}));

// Logout Route
router.get('/logout', (req, res) => {
  req.logout(); 
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('connect.sid'); // Optional
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
