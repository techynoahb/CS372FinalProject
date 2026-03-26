import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Gallery() { // Gallery function / page with hardcoded # of rows and clms
  const rows = 5
  const cols = 4

  return (
    <>
      <header>
        <br />
        <Navbar />
      </header>

      <table>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(cols)].map((_, colIndex) => (
                <td key={colIndex}>
                  <img src="" className="img" title="" alt="movie" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Footer />
    </>
  )
}

export default Gallery