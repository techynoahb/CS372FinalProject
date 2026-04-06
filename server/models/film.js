const mongoose = require('mongoose')

// Rule-set for what films (videos) look like in the Database

const filmSchema = new mongoose.Schema({
    youtubeID: {type: String, required: true, unique: true}, // Not the full link, the embed characters in the URL specifically
    filmTitle: { type: String, required: true, unique: true},
    filmDescription: {type: String, required: true},
    filmGenre: {type: String},
    filmUploader: {type: String, required: true} // Just pass the content editor username when used
})

// Likes and dislikes likely not necessary here since program only runs as a single instance.

module.exports = mongoose.model('Film', filmSchema)
