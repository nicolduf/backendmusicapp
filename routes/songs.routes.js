app.get("/api/songs", async (req, resp) => {
    try {
      const newSong = await User.find();
      res.status(201).json(newSong);
    } catch (error) {
      res.status(500).json({ error });
    }
  });