const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

router.get("/api/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/api/users/:_id", async (request, response) => {
  const { _id } = request.params;

  if (mongoose.isValidObjectId(_id)) {
    try {
      const oneUser = await User.findById(_id);
      if (oneUser) {
        response.status(200).json(oneUser);
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
