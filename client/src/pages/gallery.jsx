import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'

function Gallery({ isLoggedIn }) {
  const testVideos = [ // Test before backend is implemented
    { youtubeID: "CmomM8ncc4M", filmTitle: "The Pink Panther", filmDescription: "This is a test video description."}
  ];

  const numCols = 4;
  const numRows = Math.ceil(testVideos.length / numCols); // This SHOULD scale for number of videos
  const [modalType, setModalType] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState(null);

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
      <header>
        <br />
        <Navbar isLoggedIn={isLoggedIn}/>
      </header>

      <table>
        <tbody>
          {[...Array(numRows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(numCols)].map((_, colIndex) => {
            
                const videoIndex = rowIndex * numCols + colIndex;
                const video = testVideos[videoIndex];

                return (
                  <td key={colIndex}>
                    {video ? (
                      <>
                        <img 
                          src={`https://img.youtube.com/vi/${video.youtubeID}/hqdefault.jpg`} 
                          className="img" 
                          alt={video.filmTitle} 
                        />
                        <h4>{video.filmTitle}</h4>
                        <div>
                          <button onClick={() => openModal('watch', video)}>WATCH</button>
                          <button onClick={() => openModal('info', video)}>INFO</button>
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
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>Close X</button>
            
            {modalType === 'info' && selectedFilm && (
              <div>
                <h2>{selectedFilm.filmTitle} - Info</h2>
                <p>{selectedFilm.filmDescription}</p>
              </div>
            )}

            {modalType === 'watch' && selectedFilm && (
              <WatchView video={selectedFilm} />
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

function WatchView({ video }) {
  const [vote, setVote] = useState(null);
  //const [likes, setLikes] = useState(0);
  //const [dislikes, setDislikes] = useState(0);

  const handleLike = () => {
    if (vote === 'like') {
      setVote = null;
    }
    else {
      setVote('like');
    }
  };

  const handleDislike = () => {
    if (vote === 'dislike') {
      setVote = null;
    }
    else {
      setVote('dislike');
    }
  };

  const likes = vote === 'like' ? 1 : 0;
  const dislikes = vote === 'dislike' ? 1 : 0;

  return (
    <div>
      <h2>{video.filmTitle}</h2> {/*Video interactions; pray this works.*/}
      <iframe 
        width="560" 
        height="315" 
        src={`https://www.youtube.com/embed/${video.youtubeID}`} 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleLike}
          style={{ 
            backgroundColor: vote === 'like' ? '#ddd' : '',
            fontWeight: vote === 'like' ? 'bold' : 'normal'
          }}
        >
            Like ({likes})
        </button>
        <button onClick={handleDislike}
          style={{ // Move to CSS?
            backgroundColor: vote === 'like' ? '#ddd' : '',
            fontWeight: vote === 'like' ? 'bold' : 'normal'
          }}
        >
            Dislike ({dislikes})
        </button>
      </div>
    </div>
  );
}

export default Gallery