const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Song = require("../models/Song.model");

// GET all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    
    if (songs.length === 0) {
      return res.status(404).json({ message: "No songs found" });
    }

    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const songTitle = randomSong.title;

    res.status(200).json({ songs, songOfTheDayTitle: songTitle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

// GET
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  if (mongoose.isValidObjectId(_id)) {
    try {
      const song = await Song.findById(_id);
      if (song) {
        res.status(200).json(song);
      } else {
        res.status(404).json({ message: "Song not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// POST
router.post("/", async (req, res) => {
  const { title, artist, album, genre, label, released, image } = req.body;

  if (!title || !artist) {
    return res.status(400).json({ error: "Title and artist are required" });
  }

  try {
    const newSong = new Song({
      title,
      artist,
      album,
      genre,
      label,
      released,
      image,
    });

    await newSong.save();

    res.status(201).json(newSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/remove-from-favourites/:userId/:songId", async (req, res) => {
  const { userId, songId } = req.params;

  if (mongoose.isValidObjectId(userId) && mongoose.isValidObjectId(songId)) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.favouriteSongs.pull(songId);
      await user.save();

      res.status(200).json({ message: "Removed from favorites successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// UPDATE
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;

  if (mongoose.isValidObjectId(_id)) {
    try {
      const updatedSongData = req.body;
      const updatedSong = await Song.findByIdAndUpdate(_id, updatedSongData, {
        new: true,
      });

      if (updatedSong) {
        res.status(200).json(updatedSong);
      } else {
        res.status(404).json({ message: "Song not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

module.exports = router;
