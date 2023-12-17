const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const isAuthenticated = require('../middleware/isAuthenticated');
const profileRouter = require('express').Router();
const Diary = require('../models/Diary.model');
const Gratitude = require('../models/Gratitude.model');
const bcrypt = require('bcryptjs');

profileRouter.get('/users', isAuthenticated, async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.find({ _id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

profileRouter.put('/users', isAuthenticated, async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  try {
    const user = await User.findById(_id);

    let hashedPassword = user.password;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(_id, { ...req.body, password: hashedPassword }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error from Profile route' });
  }
});

profileRouter.delete('/users', isAuthenticated, async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await Diary.deleteMany({ userID: _id });
    await Gratitude.deleteMany({ userID: _id });
    res.json({ message: 'User and all their entries deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = profileRouter;
