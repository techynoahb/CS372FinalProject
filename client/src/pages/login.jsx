import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Toolbar from '@mui/material/Toolbar'

const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,16}$/ // Regex

function Login() { // Login page
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) navigate('/gallery')
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!regex.test(username) || !regex.test(password)) {
      alert(
        'Must be 8-16 characters with uppercase, lowercase,' +
        ' and special character.'
      )
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
      const data = await res.json()
      setUser({ username: data.username, role: data.role })
    } catch (err) {
      alert('Server error, please try again')
    }
  }

  return (
    <>
      <header id="header_login_page" name="headerLoginPage">
        <Navbar />
      </header>
      <Toolbar />
      <main id="main_login_content" name="mainLoginContent">
        <h2 id="h2_login_title" name="h2LoginTitle">
          Member Login
        </h2>  { /*Actual login text and prompts */ }
        <form id="form_login" name="formLogin"
          onSubmit={handleSubmit}
        >
          <label
            id="label_username"
            name="labelUsername"
            htmlFor="input_username"
          >
            Username:
          </label>
          <input
            type="text"
            id="input_username"
            name="inputUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /><br />
          <label
            id="label_password"
            name="labelPassword"
            htmlFor="input_password"
          >
            Password:
          </label>
          <input
            type="password"
            id="input_password"
            name="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />
          <input
            type="submit"
            id="input_submit_login"
            name="inputSubmitLogin"
            value="Submit"
          />
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Login
