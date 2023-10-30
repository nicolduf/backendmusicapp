const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const User = require("../models/User.model");
const Artist = require("../models/Artist.model")

router.get("/", async (req, res) => {
  try {
    const newArtist = await Artist.find();
    res.status(201).json(newArtist);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
});

router.get("/:_id", async (request, response) => {
  const { _id } = request.params;
  console.log(_id)

  if (mongoose.isValidObjectId(_id)) {
    try {
      const oneArtist = await Artist.findById(_id);
      if (oneArtist) {
        response.status(200).json(oneArtist);
      } else {
        response.status(404).json({ message: "Artist not found" });
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


