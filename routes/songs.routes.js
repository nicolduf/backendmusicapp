const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

router.get("/api/songs", async (req, res) => {
  try {
    const allSongs = await Song.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/api/songs/:_id", async (request, response) => {
  const { _id } = request.params;

  if (mongoose.isValidObjectId(_id)) {
    try {
      const oneSong = await User.findById(_id);
      if (oneSong) {
        response.status(200).json(oneSong);
      } else {
        response.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  } else {
    response.status(400).json({ message: "Invalid ID format" });
  }
});

module.exports = router;