import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Gallery({ isLoggedIn }) {
  const testVideos = [ // Test before backend is implemented
    {
      youtubeID: "CmomM8ncc4M",
      filmTitle: "The Pink Panther",
      filmDescription: "This is a test video description."
    }
  ];

  const numCols = 4;
  const numRows = Math.ceil(testVideos.length / numCols); // This SHOULD scale for number of videos
  const [modalType, setModalType] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const { user } = useAuth()

  const openModal = (type, video) => {
    setModalType(type);
    setSelectedFilm(video);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedFilm(null);
  };

  return (
    <>
      <header id="header_gallery_page" name="headerGalleryPage">
        <br />
        <Navbar isLoggedIn={isLoggedIn}/>
      </header>
      <table id="table_gallery_films" name="tableGalleryFilms">
        <tbody id="tbody_gallery_rows" name="tbodyGalleryRows">
          {[...Array(numRows)].map((_, rowIndex) => (
            <tr
              key={rowIndex}
              id={`tr_gallery_row_${rowIndex}`}
              name={`trGalleryRow${rowIndex}`}
            >
              {[...Array(numCols)].map((_, colIndex) => {

                const videoIndex = rowIndex * numCols + colIndex;
                const video = testVideos[videoIndex];

                return (
                  <td
                    key={colIndex}
                    id={`td_gallery_cell_${videoIndex}`}
                    name={`tdGalleryCell${videoIndex}`}
                  >
                    {video ? (
                      <>
                        <img
                          id={`img_film_thumbnail_${videoIndex}`}
                          name={`imgFilmThumbnail${videoIndex}`}
                          src={
                            `https://img.youtube.com/vi/` +
                            `${video.youtubeID}/hqdefault.jpg`
                          }
                          className="img"
                          alt={video.filmTitle}
                        />
                        <h4
                          id={`h4_film_title_${videoIndex}`}
                          name={`h4FilmTitle${videoIndex}`}
                        >
                          {video.filmTitle}
                        </h4>
                        <div
                          id={`div_film_buttons_${videoIndex}`}
                          name={`divFilmButtons${videoIndex}`}
                        >
                          <button
                            id={`button_watch_${videoIndex}`}
                            name={`buttonWatch${videoIndex}`}
                            onClick={() => openModal('watch', video)}
                          >
                            WATCH
                          </button>
                          <button
                            id={`button_info_${videoIndex}`}
                            name={`buttonInfo${videoIndex}`}
                            onClick={() => openModal('info', video)}
                          >
                            INFO
                          </button>
                        </div>
                      </>
                    ) : null} {/* Renders nothing if the cell is empty */}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {modalType && (
        <div
          id="div_modal_overlay"
          name="divModalOverlay"
          className="modal-overlay"
        >
          <div
            id="div_modal_content"
            name="divModalContent"
            className="modal-content"
          >
            <button
              id="button_modal_close"
              name="buttonModalClose"
              className="close-btn"
              onClick={closeModal}
            >
              Close X
            </button>

            {modalType === 'info' && selectedFilm && (
              <div id="div_info_panel" name="divInfoPanel">
                <h2 id="h2_info_title" name="h2InfoTitle">
                  {selectedFilm.filmTitle} - Info
                </h2>
                <p id="p_info_description" name="pInfoDescription">
                  {selectedFilm.filmDescription}
                </p>
              </div>
            )}

            {modalType === 'watch' && selectedFilm && (
              <WatchView video={selectedFilm} role={user?.role} />
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

function WatchView({ video, role }) {
  const [vote, setVote] = useState(null);
  const [showComment, setShowComment] = useState(false)
  const [commentText, setCommentText] = useState('')

  const handleLike = () => { // like and dislike handler to display appropriate reactions
    // depending on which button the user presses.
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

  const likes = vote === 'like' ? 1 : 0;
  const dislikes = vote === 'dislike' ? 1 : 0;

  return (
    <div id="div_watch_view" name="divWatchView">
      <h2 id="h2_watch_title" name="h2WatchTitle">
        {video.filmTitle}
      </h2> {/*Video interactions*/}
      <iframe
        id="iframe_video_player"
        name="iframeVideoPlayer"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video.youtubeID}`}
        title="YouTube video player"
        frameBorder="0"
        allow={
          "accelerometer; autoplay; clipboard-write; " +
          "encrypted-media; gyroscope; picture-in-picture"
        }
        allowFullScreen
      ></iframe>

      <div
        id="div_vote_buttons"
        name="divVoteButtons"
        style={{ marginTop: '20px' }}
      >
        <button
          id="button_vote_like"
          name="buttonVoteLike"
          onClick={handleLike}
          style={{
            backgroundColor: vote === 'like' ? '#ddd' : '',
            fontWeight: vote === 'like' ? 'bold' : 'normal'
          }}
        >
          Like ({likes})
        </button>
        <button
          id="button_vote_dislike"
          name="buttonVoteDislike"
          onClick={handleDislike}
          style={{ // Move to CSS?
            backgroundColor: vote === 'dislike' ? '#ddd' : '',
            fontWeight: vote === 'dislike' ? 'bold' : 'normal'
          }}
        >
          Dislike ({dislikes})
        </button>
      </div>

      {role === 'marketing_manager' && ( // Not-yet-functional comment interface for marketing manager role
        <div id="div_comment_section" name="divCommentSection">
          <button
            id="button_comment_toggle"
            name="buttonCommentToggle"
            onClick={() => setShowComment(!showComment)}
          >
            {showComment ? 'Return' : 'Comment'}
          </button>
          {showComment && (
            <>
              <textarea
                id="textarea_comment"
                name="textareaComment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                id="button_comment_send"
                name="buttonCommentSend"
                onClick={() => console.log(commentText)}
              >
                Send
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Gallery