const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("All good in here");
});

router.get("/users", async (req, res) => {
  try {
    const newUser = await User.find();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/songs", async (req, res) => {
  try {
    const newSong = await Song.find();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/artists", async (req, res) => {
  try {
    const newArtist = await Artist.find();
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
