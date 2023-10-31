const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
  },
  name: String,
  lastName: String,
  location: String,
  favouriteSongs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  favouriteArtists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
