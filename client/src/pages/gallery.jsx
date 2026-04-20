import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function Gallery({ isLoggedIn }) {
  const [modalType, setModalType] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [fetchedFilms, setFetchedFilms] = useState([])
  const { user } = useAuth()

  const openModal = (type, video) => {
      setModalType(type);
      setSelectedFilm(video);
  };

  const closeModal = () => {
      setModalType(null);
      setSelectedFilm(null);
  };

  const handleFetchFilms = async() => {
    try {
      const res = await fetch(`http://localhost:5001/api/films`);
      if (res.ok) {
        const data = await res.json()
        setFetchedFilms(data)
      }
    }
    catch (err) {
      console.error("Failed to fetch films (videos).", err)
    }
  }

  useEffect(() => {
    handleFetchFilms();
  }, []);

return (
  <>
    <div className='page-bg' id = "page_bg" name = "pageBG">
      <header id="header_gallery_page" name="headerGalleryPage">
        <br />
        <Navbar isLoggedIn={isLoggedIn}/>
      </header>
      <div id="div_gallery_grid" name="divGalleryGrid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '16px' }}
      >
        {/* simpler css grid array, that will scale with the 
        # of videos we have, should work with add/deleting as well */}
        {fetchedFilms.map((video, i) => (
          <div key={i} id={`div_gallery_cell_${i}`} name={`divGalleryCell${i}`}>
            <img id={`img_film_thumbnail_${i}`} name={`imgFilmThumbnail${i}`} 
            src={`https://img.youtube.com/vi/${video.youtubeID}/hqdefault.jpg`}
            className="img"
            alt={video.filmTitle}
            />
          <h4 id={`h4_film_title_${i}`} name={`h4FilmTitle${i}`}>
          {video.filmTitle}
          </h4>
          <div id={`div_film_buttons_${i}`} name={`divFilmButtons${i}`}>
            <button id={`button_watch_${i}`} name={`buttonWatch${i}`}
              onClick={() => openModal('watch', video)}
              >
              WATCH
            </button>
              <button id={`button_info_${i}`} name={`buttonInfo${i}`} onClick={() => openModal('info', video)}
              >
              INFO
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalType && (
        <div id="div_modal_overlay" name="divModalOverlay" className="modal-overlay">
          <div id="div_modal_content" name="divModalContent" className="modal-content">
            <button id="button_modal_close" name="buttonModalClose" className="close-btn"
              onClick={closeModal}>
              Close X
            </button>
            {modalType === 'info' && selectedFilm && (
              <div id="div_info_panel" name="divInfoPanel">
                <h2 id="h2_info_title" name="h2InfoTitle">
                  {selectedFilm.filmTitle} - Info
                </h2>
                <h4 id="h4_info_genre" name="h4InfoGenre">
                  Genre: {selectedFilm.filmGenre}
                </h4>
                <h4 id="h4_info_uploader" name="h4InfoUploader">
                  Uploader: {selectedFilm.filmUploader}
                </h4>
                <p id="p_info_description" name="pInfoDescription">
                  {selectedFilm.filmDescription}
                </p>
              </div>
            )}

            {modalType === 'watch' && selectedFilm && (
              <WatchView video={selectedFilm} role={user?.role} username={user?.username} closeModal={closeModal} refreshGallery={handleFetchFilms}/>
            )}
          </div>
        </div>
      )}

      <Footer />
      </div>
    </>
  )
}
{/* this component renders when you click watch on the film card 
  it takes video and role from useAuth as props so it knows actually what 
  film to play and if the UI for commenting or not based on role*/} 

  function WatchView({ video, role, username, closeModal, refreshGallery }) {
  const [vote, setVote] = useState(null);
  const [showComment, setShowComment] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [fetchedComments, setFetchedComments] = useState([])

  const handleLike = () => { // like and dislike handler to display appropriate reactions
    if (vote === 'like') {
      setVote(null);
    }
    else {
      setVote('like');
    }
  };

  const handleDislike = () => {
    if (vote === 'dislike') {
      setVote(null);
    }
    else {
      setVote('dislike');
    }
  };

  // if user likes, then like = 1 and dislike is 0, and vice versa
  const likes = vote === 'like' ? 1 : 0;
  const dislikes = vote === 'dislike' ? 1 : 0;

  const handleSendComment = async() => {
    if (!commentText.trim())
      return;
    try {
      const res = await fetch('http://localhost:5001/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({youtubeID: video.youtubeID, commentText: commentText.trim(), username: username})
      });
      if (res.ok) {
        alert("Comment sent!")
        setCommentText('')
        setShowComment(false)
      }
      else {
        alert("Error: Failed to send comment.")
      }
    } catch(err) {
      console.error(err)
      alert("Server error, please try again.")
    }
  }

  const handleFetchComments = async() => {
    setShowComment(!showComment)
    if (!showComment) {
      try {
        const res = await fetch(`http://localhost:5001/api/comments/${video.youtubeID}`);
        if (res.ok) {
          const data = await res.json()
          setFetchedComments(data)
        }
      }
      catch (err) {
        console.error("Failed to fetch comments.", err)
      }
    }
  };

  const handleDeleteFilm = async() => {
    const confirmDelete = window.confirm(`Delete "${video.filmTitle}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5001/api/films/${video.youtubeID}`, { method: 'DELETE' })
      if (res.ok) {
        alert(`${video.filmTitle} has successfully been deleted.`)
        closeModal();
        refreshGallery();
      }
      else {
        alert("Error: Failed to delete film.")
      }
    }
    catch (err) {
      console.error("Failed to connect to server for update. ", err);
    }

  }

  const handleDeleteComment = async(commentID) => {
    try {
      const res = await fetch(`http://localhost:5001/api/comments/${commentID}`, { method: 'DELETE' })
      if (res.ok) {
        alert(`Comment has successfully been deleted.`)
        setFetchedComments(fetchedComments.filter(comment => comment._id !== commentID));
      }
      else {
        alert("Error: Failed to delete comment.")
      }
    }
    catch (err) {
      console.error("Failed to connect to server for update. ", err);
    }

  }

  return (
    <div id="div_watch_view" name="divWatchView">
      <h2 id="h2_watch_title" name="h2WatchTitle">
        {video.filmTitle}
      </h2> {/*Video interactions, i frame for video 'box'*/}
      <iframe id="iframe_video_player" name="iframeVideoPlayer" width="560" height="315"
        src={`https://www.youtube.com/embed/${video.youtubeID}`} title="YouTube video player"
        frameBorder="0" allow={ "accelerometer; autoplay; clipboard-write; " +
          "encrypted-media; gyroscope; picture-in-picture"
        }
      allowFullScreen
      ></iframe>

      <div id="div_vote_buttons" name="divVoteButtons" style={{ marginTop: '20px' }}
      >
        {/* actual like and dislike buttons */}
        <button id="button_vote_like" name="buttonVoteLike" onClick={handleLike}
          style={{
            backgroundColor: vote === 'like' ? '#ddd' : '',
            fontWeight: vote === 'like' ? 'bold' : 'normal'
          }}
        >
          Like ({likes})
        </button>
        <button id="button_vote_dislike" name="buttonVoteDislike" onClick={handleDislike}
          style={{  // in-line css
            backgroundColor: vote === 'dislike' ? '#ddd' : '',
            fontWeight: vote === 'dislike' ? 'bold' : 'normal'
          }}
        >
          Dislike ({dislikes})
        </button>
      </div>

      {/* Delete film button for content editor */}
      {role === 'content_editor' && (
        <div id="div_delete_film" name="divDeleteFilm" style={{ marginTop: '10px' }}>
          <button 
            id="button_delete_film" 
            name="buttonDeleteFilm" 
            onClick={handleDeleteFilm}
            style={{ backgroundColor: '#a59a9a', color: 'white', fontWeight: 'bold' }}
          >
            Delete Film
          </button>
        </div>
      )}

      {(role === 'content_editor' || role === 'marketing_manager') && ( 
        <div id="div_comment_section" name="divCommentSection">
          <button id="button_comment_toggle" name="buttonCommentToggle"
            onClick={handleFetchComments}>
            {showComment ? // Varying button text by role: read-only for content editor, read AND write for marketing manager
              'Return' :
                (role === 'marketing_manager'
                  ? 'Leave & Review Comments'
                  : 'Read Comments from Marketing Manager'
                )
            }
          {/* Button for viewing comments from marketing manager*/}
          </button>
          {showComment && (
            <div>
              {fetchedComments.length > 0 ? (
                fetchedComments.map((comment, index) => (
                  <div
                    key={index}
                    id="div_fetch_comments"
                    name="divFetchComments"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}
                  >
                    {/* Print every comment author username and comment text, and delete button if logged in as marketing manager */}
                    <p style={{ margin: 0 }}><strong>{comment.username}</strong>: {comment.commentText}</p>
                    {role === 'marketing_manager' && username === comment.username && (
                      <button 
                        id="button_delete_comment" 
                        name="buttonDeleteComment" 
                        onClick={() => handleDeleteComment(comment._id)}
                        style={{ backgroundColor: '#a59a9a', color: 'white', fontWeight: 'bold', marginLeft: '15px' }}
                      >
                        Delete Comment
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No Comments</p>
              )}

              {role === 'marketing_manager' && (
                <>
                  <br/>
                  <textarea id="textarea_comment" name="textareaComment" value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  {/*Button to send marketing manager comment into database to be saved for viewing*/}
                  <button id="button_comment_send" name="buttonCommentSend" 
                    onClick={handleSendComment}
                  >
                    Send
                  </button>
                </>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default Gallery