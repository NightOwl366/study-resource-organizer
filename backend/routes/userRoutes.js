const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

async function createAdminAccount() {
  try {
    const adminExists = await User.findOne({ email: 'admin@study.com' });

    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@study.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin account created');
    }
  } catch (error) {
    console.log('Error creating admin:', error);
  }
}

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    await User.create({
      name: name,
      email: email,
      password: password,
      role: 'user'
    });

    res.status(201).json({ message: 'Account created successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = { router, User, createAdminAccount };