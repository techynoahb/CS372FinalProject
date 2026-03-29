import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user } = useAuth()
  return (
    <div className="topnav">
      <h4>Cinema Scenes: Movie Host</h4>
      <Link to="/home">Home</Link>
      {!user && <Link to="/login">Login</Link>}
      {user && <Link to="/gallery">Gallery</Link>}
      {user?.role === 'content_editor' && <Link to="/upload">Upload</Link>}
    </div>
  )
}

export default Navbar