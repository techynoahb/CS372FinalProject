import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Toolbar from '@mui/material/Toolbar'

const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,16}$/ // Regex

function Login() { // Login page
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!regex.test(username) || !regex.test(password)) {
      alert('Must be 8-16 characters with uppercase, lowercase, and special character.')
      return
    }
    try {
      const res = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!res.ok) {
        alert('Invalid username or password')
        return
      }
      // users now cannot login without one of the 3 predefined
      // user/pw.
      const data = await res.json()
      setUser({ username: data.username, role: data.role })
      navigate('/gallery')
    } catch (err) {
      alert('Server error, please try again')
    }
  }

  return (
    <>
      <header> 
        <Navbar /> 
      </header>
      <Toolbar />
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