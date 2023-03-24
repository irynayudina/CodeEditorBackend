const express = require('express');
const router = express.Router();
const User = require('../../models/user');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a new user
router.post('/', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const savedUser = await newUser.save();
  res.json(savedUser);
});

module.exports = router;