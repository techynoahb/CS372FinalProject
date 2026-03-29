import { Link } from 'react-router-dom'

function Navbar({ isLoggedIn }) {
  return (
    <div className="topnav">
      <h4>Cinema Scenes: Movie Host</h4>
      {/* show login when user is NOT logged in */}
      {!isLoggedIn && <Link to="/login">Login</Link>} 
      <Link to="/home">Home</Link> {/* home page is always visible */}
      {/* show Gallery ONLY when the user IS logged in */}
      {isLoggedIn && <Link to="/gallery">Gallery</Link>}
    </div>
  )
}

export default Navbar