<<<<<<< HEAD
=======
import { useState } from 'react'
>>>>>>> dfbd28f8b969f3a734a2a2f2216a6b397ee707cc
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Gallery from './pages/gallery'
import Login from './pages/login'
import Upload from './pages/upload'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

<<<<<<< HEAD
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/upload" element={
            <ProtectedRoute requiredRole="content_editor">
              <Upload />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
=======
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
>>>>>>> dfbd28f8b969f3a734a2a2f2216a6b397ee707cc
  )
}

export default App