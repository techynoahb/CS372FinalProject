import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,16}$/ // Regex

function Login() { // Login page
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) { // login handling
    e.preventDefault()
    if (!regex.test(username) || !regex.test(password)) {
      alert('Must be 8-16 characters with uppercase, lowercase, and special character.')
      return
    }
    console.log('Login submitted!')
  }

  return (
    <>
      <header> 
        <Navbar /> 
      </header>
      <main>
        <h2>Member Login</h2>  { /*Actual login text and prompts */ }
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /><br />
          <label htmlFor="pwd">Password:</label>
          <input
            type="password"
            id="pwd"
            name="pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />
          <input type="submit" value="Submit" />
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Login