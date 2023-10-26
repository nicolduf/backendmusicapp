app.get("/api/artists", async (req, resp) => {
    try {
      const newArtist = await User.find();
      res.status(201).json(newArtist);
    } catch (error) {
      res.status(500).json({ error });
    }
  });