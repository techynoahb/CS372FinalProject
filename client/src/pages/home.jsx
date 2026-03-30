import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Toolbar from '@mui/material/Toolbar'

function Home({ isLoggedIn }) { // Home page - SUPER BASIC
  return (
    <>
      <header>
        <br />
        <Navbar isLoggedIn={isLoggedIn} />
      </header>
      <Toolbar />
      <main>
        <h2>Welcome</h2>
      </main>

      <Footer />
    </>
  )
}

export default Home