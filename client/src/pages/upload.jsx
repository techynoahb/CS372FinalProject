import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const YTregex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/ // Regex
function Upload() { // Upload page for content editor
  const navigate = useNavigate()
  const [filmTitle, setTitle] = useState('')
  const [filmDescription, setDescription] = useState('')
  const [url, setUrl] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!filmTitle || !filmDescription || !YTregex.test(url)) {
      alert('Improper YouTube URL. Try again.')
      return
    }
    console.log('Movie uploaded!')
    navigate('/gallery')
  }

  return (
    <>
      <header> 
        <Navbar /> 
      </header>
      <main>
        <h2>Content Editor: Upload Films</h2>  { /*Actual login text and prompts */ }
        <form onSubmit={handleSubmit}>
          <label htmlFor="filmTitle">Movie Title:</label>
          <input
            type="text"
            id="filmTitle"
            name="filmTitle"
            value={filmTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br /><br />
          <label htmlFor="filmDescription">Film Description: </label>
          <textarea
            id="filmDescription"
            name="filmDescription"
            value={filmDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br /><br />
          <label htmlFor="url">Youtube URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <br /><br />
          <input type="submit" value="Submit" />
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Upload