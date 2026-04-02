require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const Comment = require('./models/comment')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

app.get('/', (req, res) => {
  res.send('Server is running!')
})

{/* post API login route that searches DB for matching user and pw 
and returns the users role.*/
}
app.post('/api/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body)
    const { username, password } = req.body
    const user = await User.findOne({ username, password })
    // display message if not valid user and pw
    console.log('User found:', user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }
    res.json({ username: user.username, role: user.role })
  } catch (err) {
    // if not able to get validation/ server error
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

// To save comments by marketing manager
app.post('/api/comments', async (req, res) => { 
  try {
    const { youtubeID, commentText, username } = req.body
    const newComment = new Comment({ youtubeID, commentText, username })
    await newComment.save()
    res.status(201).json({ message: 'Comment saved successfully' })
  }
  catch (err) {
    console.error("Error: Marketing Manager comment failed to save.")
    res.status(500).json({ message: 'Server error saving comments.' })
  }
})

// To retrieve comments by content editor
app.get('/api/comments/:youtubeID', async (req, res) => { 
  try {
    const comments = await Comment.find({ youtubeID: req.params.youtubeID })
    res.json(comments)
    console.log('Comments found:', comments)
  }
  catch (err) {
    console.error("Error: Failed to fetch comments.")
    res.status(500).json({ message: 'Server error fetching comments.' })
  }
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5001}`)
})
