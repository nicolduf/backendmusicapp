const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  if (mongoose.isValidObjectId(_id)) {
    try {
      const oneUser = await User.findById(_id);
      if (oneUser) {
        res.status(200).json(oneUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

router.post('/add-to-favourites/:userId/:songId', async (req, res) => {
  const { userId, songId } = req.params;

  if (mongoose.isValidObjectId(userId) && mongoose.isValidObjectId(songId)) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!user.favouriteSongs.includes(songId)) {
        user.favouriteSongs.push(songId);
        await user.save();

        return res.status(200).json({ message: 'Song added to favorites' });
      }

      return res.status(200).json({ message: 'Song is already in favorites' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
});

// Update a user's profile
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const updatedUserData = req.body; 

  try {
    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
