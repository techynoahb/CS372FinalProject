import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Gallery from './pages/gallery'


function App() { /* routes is essentialy 1-1 anchor tags */
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} /> {/* This line makes the root page at Login */}
        <Route path="/home" element={<Home/>} /> {/* almost the same as href = home.html...*/}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App