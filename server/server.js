const express = require('express')
const cors = require('cors')

// to spin up a server run "node server.js" in the terminal.
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
