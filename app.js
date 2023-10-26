const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const PORT = 5005;
require("dotenv").config()
require("./db/index")

const app = express();
require("./config")(app)

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv

module.exports = app;
