const express = require("express");
const router = express.Router();

app.get("/api/songs", async (req, res) => {
    try {
      const newSong = await User.find();
      res.status(201).json(newSong);
    } catch (error) {
      res.status(500).json({ error });
    }
  });