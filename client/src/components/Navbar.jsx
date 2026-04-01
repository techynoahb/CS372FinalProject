import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user } = useAuth()
  return (
    <AppBar position="fixed"> {/* makes navbar stick to the top of the page */}
      <Toolbar variant = "dense"> {/* mui library*/}
        <Typography variant="h6" sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          Cinema Scenes: Movie Host
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" component={Link} to="/home">Home</Button>
        {!user && <Button color="inherit" component={Link} to="/login">Login</Button>}
        {user && <Button color="inherit" component={Link} to="/gallery">Gallery</Button>}
        {user?.role === 'content_editor' && (
          <Button color="inherit" component={Link} to="/upload">Upload</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar