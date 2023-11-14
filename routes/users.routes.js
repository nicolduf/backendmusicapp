// Import necessary modules and middleware
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');

// Import your data models
const User = require("../models/User.model");
const Song = require("../models/Song.model");
const Artist = require("../models/Artist.model");

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to retrieve song profiles by songId
router.get("/song/:songId", async (req, res) => {
  const { songId } = req.params;

  if (mongoose.isValidObjectId(songId)) {
    try {
      const song = await Song.findById(songId);

      if (song) {
        res.status(200).json(song);
      } else {
        res.status(404).json({ message: "Song not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// Endpoint to retrieve artist profiles by artistId
router.get("/artist/:artistId", async (req, res) => {
  const { artistId } = req.params;

  if (mongoose.isValidObjectId(artistId)) {
    try {
      const artist = await Artist.findById(artistId);

      if (artist) {
        res.status(200).json(artist);
      } else {
        res.status(404).json({ message: "Artist not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

// Existing user routes

// Get all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile by userId
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  if (mongoose.isValidObjectId(_id)) {
    try {
      const oneUser = await User.findById(_id)
        .populate('favouriteSongs') 
        .populate('favouriteArtists');

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

// Add a song to a user's favorites
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

// Add an artist to a user's favorites
router.post('/add-artist-to-favourites/:userId/:artistId', async (req, res) => {
  const { userId, artistId } = req.params;

  if (mongoose.isValidObjectId(userId) && mongoose.isValidObjectId(artistId)) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!user.favouriteArtists.includes(artistId)) {
        user.favouriteArtists.push(artistId);
        await user.save();

        return res.status(200).json({ message: 'Artist added to favorites' });
      }

      return res.status(200).json({ message: 'Artist is already in favorites' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
});

// Update user data, including the profile picture
router.put("/:userId", upload.single('image'), async (req, res) => {
  const { userId } = req.params;
  const updatedUserData = req.body;
  const imageFile = req.file;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's profile picture if an image is provided
    if (imageFile) {
      user.image = imageFile.buffer; // Save the image buffer
    }

    // Update other user data
    user.username = updatedUserData.username;
    user.location = updatedUserData.location;

    // Save the user's data
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
