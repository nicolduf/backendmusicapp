const express = require("express");
const router = express.Router();


app.get("/api/users", async (req, res) => {
  try {
    const newUser = await User.find();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;