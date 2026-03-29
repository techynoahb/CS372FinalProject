import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home({ isLoggedIn }) { // Home page - SUPER BASIC
  return (
    <>
      <header>
        <br />
        <Navbar isLoggedIn={isLoggedIn} />
      </header>

      <main>
        <h2>Welcome</h2>
      </main>

      <Footer />
    </>
  )
}

export default Home