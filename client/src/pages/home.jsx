import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Toolbar from '@mui/material/Toolbar'

function Home({ isLoggedIn }) { // Home page - SUPER BASIC
  return (
    <div className='page-bg' id = "page_bg" name = "pageBG">
      <header id="header_home_page" name="headerHomePage">
        <br />
        <Navbar isLoggedIn={isLoggedIn} />
      </header>
      <Toolbar />
      <main id="main_home_content" name="mainHomeContent">
        <h2 id="h2_home_title" name="h2HomeTitle">Welcome</h2>
        <p id="p_home_description" name="pHomeDescription">
          Welcome to Cinema Scenes, your all in one solution to
          streaming with No ads and no fees EVER.
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default Home
