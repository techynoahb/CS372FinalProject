require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/user')

// const users / log-in info
const users = [

  { username: 'Viewer_user!', password: 'Viewer_Pass1!', role: 'viewer' },
  { username: 'ContentEditor99!', password: 'Editor_Pass1!', role: 'content_editor' },
  { username: 'Manager99!', password: 'Manage_Pass1!', role: 'marketing_manager' }
] 

async function seed() { // deletes everything from db and inserts USER collect
  // no need to run this again, the user collection lives in the DB now.
  await mongoose.connect(process.env.MONGODB_URI)
  await User.deleteMany({})
  await User.insertMany(users) // validates with the schema
  // then writes documents to the users collection assuming
  // everything passes with no errors.
  console.log('Users seeded successfully!')
  await mongoose.disconnect()
}

seed().catch(console.error)
