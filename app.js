const express = require("express");
require("dotenv").config();
require("./db/index");

const app = express();

require("./config")(app);

const songsRoutes = require("./routes/songs.routes");
app.use("/api/songs", songsRoutes);

const artistsRoutes = require("./routes/artists.routes");
app.use("/api/artists", artistsRoutes);

const indexRoutes = require("./routes/index.routes");
app.use("/api/index", indexRoutes); 

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);



require('./error-handling')(app);

module.exports = app;

