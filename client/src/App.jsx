import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Gallery from './pages/gallery'

{/* to see UI use "npm run dev" */}

function App() { /* routes is essentialy 1-1 anchor tags */
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login setIsLoggedIn = {setIsLoggedIn} />} /> 
        {/* This line makes the root page at Login */}
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} /> 
        {/*'route path' almost the same as href = home.html...*/}
        <Route path="/gallery" element={<Gallery isLoggedIn = {isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App