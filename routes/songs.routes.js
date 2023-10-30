const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Song = require("../models/Song.model");

router.get("/", async (req, res) => {
  try {
    const newSong = await Song.find();
    console.log(newSong);
    res.status(201).json(newSong);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/:_id", async (request, response) => {
  const { _id } = request.params;
  console.log(_id)

  if (mongoose.isValidObjectId(_id)) {
    try {
      const oneSong = await Song.findById(_id);
      if (oneSong) {
        response.status(200).json(oneSong);
      } else {
        response.status(404).json({ message: "Song not found" });
      }
    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error.message });
    }
  } else {
    response.status(400).json({ message: "Invalid ID format" });
  }
});

module.exports = router;