const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    album: String,
    genre: String,
    lable: String,
    released: Number,
    image: {type: String, default: "https://t3.ftcdn.net/jpg/01/97/22/04/360_F_197220472_GaADN1WytBfvTv8vIc7lgfvB815oHYTO.jpg"} 

});

const Song = mongoose.model("Song", songSchema);
module.exports = Song;