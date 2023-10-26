const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); 
const PORT = 5005;

mongoose
  .connect("mongodb://127.0.0.1:27017/music-app-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const User = require("./models/User.model");
const Song = require("./models/Song.model");
const Artist = require("./models/Artist.model");

const users = require("./db/users.json");
const songs = require("./db/songs.json");
const artists = require("./db/artists.json");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// Include other required modules like routes, error handling, etc.
// You have to create a "db.js" and "config.js" file with their respective configurations.

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
