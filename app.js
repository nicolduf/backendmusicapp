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

require('./error-handling')(app)

module.exports = app;
