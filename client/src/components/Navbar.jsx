import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="topnav">
      <h4>Cinema Scenes: Movie Host</h4>
      <Link to="/login">Login</Link>
      <Link to="/home">Home</Link>
      <Link to="/gallery">Gallery</Link>
    </div>
  )
}

export default Navbar