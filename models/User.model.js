const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, lowercase: true, trim: true},
    passwordHash: {type: String, required: true}
  },

  { 
    timestamps: true 
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
