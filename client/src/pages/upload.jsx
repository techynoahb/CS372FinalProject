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
      <header id="header_upload_page" name="headerUploadPage">
        <Navbar />
      </header>
      <main id="main_upload_content" name="mainUploadContent">
        <h2 id="h2_upload_title" name="h2UploadTitle">
          Content Editor: Upload Films
        </h2>  { /*Actual login text and prompts */ }
        <form
          id="form_upload"
          name="formUpload"
          onSubmit={handleSubmit}
        >
          <label
            id="label_film_title"
            name="labelFilmTitle"
            htmlFor="input_film_title"
          >
            Movie Title:
          </label>
          <input
            type="text"
            id="input_film_title"
            name="inputFilmTitle"
            value={filmTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br /><br />
          <label
            id="label_film_description"
            name="labelFilmDescription"
            htmlFor="textarea_film_description"
          >
            Film Description:
          </label>
          <textarea
            id="textarea_film_description"
            name="textareaFilmDescription"
            value={filmDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br /><br />
          <label
            id="label_youtube_url"
            name="labelYoutubeUrl"
            htmlFor="input_youtube_url"
          >
            Youtube URL:
          </label>
          <input
            type="text"
            id="input_youtube_url"
            name="inputYoutubeUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <br /><br />
          <input
            type="submit"
            id="input_submit_upload"
            name="inputSubmitUpload"
            value="Submit"
          />
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Upload
