const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config() // Make a server.env file w/ MONGO_URI=[connection string]/Project

// to spin up a server run "node server.js" in the terminal.
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error: ', err))

app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})