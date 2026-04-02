const mongoose = require('mongoose')

// Rule-set for what comments look like in the Database

const commentSchema = new mongoose.Schema({
    youtubeID: {type: String, required: true},
    username: { type: String, required: true},
    commentText: { type: String, required: true },
})

module.exports = mongoose.model('Comment', commentSchema)
