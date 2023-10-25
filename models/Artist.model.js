const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const artistSchema = new Schema({
    name: {type: String, required: true},
    realName: String,
    location: String,
    image: {type: String, default: "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"}
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;