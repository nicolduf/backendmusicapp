const express = require("express");
const router = express.Router();

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

module.exports = router;
