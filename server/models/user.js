const mongoose = require('mongoose')

// bascially the rule-set for who is allowed in to the DB
// so if you tried adding a user with an admin role it wouldnt work
// only things defined here are allowed in the DB

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['viewer', 'content_editor', 'marketing_manager'],
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)
