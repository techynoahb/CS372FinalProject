import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const YTregex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/ // Regex
function Upload() { // Upload page for content editor
  const navigate = useNavigate()
  const { user } = useAuth()
  const [filmTitle, setTitle] = useState('')
  const [filmDescription, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [filmGenre, setGenre] = useState('')

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!filmTitle || !filmDescription || !filmGenre) {
      alert('Fill out all fields and try again.')
      return
    }

    // Get only the video ID chars for embed
    const match = url.match(YTregex)
    const videoID = (match && match[2].length === 11) ? match[2] : null

    if (!videoID) {
      alert('Improper YouTube URL. Try again.')
      return
    }

    try {
      const res = await fetch('http://localhost:5001/api/films', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          youtubeID: videoID,
          filmTitle: filmTitle,
          filmDescription: filmDescription,
          filmGenre: filmGenre,
          filmUploader: user?.username
        })
      });
      if (res.ok) {
        alert("Movie uploaded!")
        navigate('/gallery')
      }
      else {
        alert("Error: Failed to upload movie.")
      }
    } catch(err) {
      console.error(err)
      alert("Server error, please try again.")
    }
  }

  return (
    <>
      <div className='page-bg' id = "page_bg" name = "pageBG">
      <header id="header_upload_page" name="headerUploadPage">
        <Navbar />
      </header>
      <main id="main_upload_content" name="mainUploadContent">
        <h2 id="h2_upload_title" name="h2UploadTitle">
          Content Editor: Upload Films
        </h2>  { /*Actual login text and prompts */ }
        <form id="form_upload" name="formUpload" onSubmit={handleSubmit}
        >
          <label id="label_film_title" name="labelFilmTitle" htmlFor="input_film_title"
          >
            Movie Title:
          </label>
          <input type="text" id="input_film_title" name="inputFilmTitle" value={filmTitle}
            onChange={(e) => setTitle(e.target.value)} 
          />
          <br /><br />
          <label id="label_film_description" name="labelFilmDescription" 
          htmlFor="textarea_film_description"
          >
            Film Description:
          </label>
          <textarea id="textarea_film_description" name="textareaFilmDescription" value={filmDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br /><br />
          <label id="label_youtube_url" name="labelYoutubeUrl" htmlFor="input_youtube_url" >
            Youtube URL:
          </label>
          <input type="text" id="input_youtube_url" name="inputYoutubeUrl" value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <br /><br />
          <label id="label_film_genre" name="labelFilmGenre" htmlFor="input_film_genre" >
            Film Genre: 
          </label>
          <input type="text" id="input_film_genre" name="inputFilmGenre" value={filmGenre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <br /><br />
          <input type="submit" id="input_submit_upload" name="inputSubmitUpload" value="Submit"
          />
        </form>
      </main>
      <Footer />
      </div>
    </>
  )
}

export default Upload
