const express = require('express');
const router = express.Router();

app.get("/api/artists", async (req, res) => {
    try {
      const newArtist = await User.find();
      res.status(201).json(newArtist);
    } catch (error) {
      res.status(500).json({ error });
    }
  });