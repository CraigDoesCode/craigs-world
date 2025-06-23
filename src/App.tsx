import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import Playlist from './components/playlist'
import Search from './components/search'

const playlistItems = [
  {trackName: "Jackie Onasis", artistName: "Sammie Rae & Friends"},
  {trackName: "Superstition", artistName: "Stevie Wonder"},
]

interface PlaylistItem {
  trackName: string;
  artistName: string;
}

function App() {
  const [insult, setInsult] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [playlist] = useState<PlaylistItem[]>(playlistItems)

  const generateInsult = async () => {
    const newInsult = "Don't be silly you're great! no instults here, check back in a couple of weeks to see the progress \n silly goose 🪿"

    setInsult(newInsult)
  }

   useEffect(() => {
     const params = new URLSearchParams(window.location.search);
     if (params.get("preview") === "true") {
       setIsPreview(true);
     }
   }, []);

  return (
    <>
      <Header />
      <div className="main">
        {isPreview && <Search />}
        {isPreview && <Playlist playlistItems={playlist} />}
      </div>
      {!isPreview && (
        <div className="card">
          <p>
            My site (soon to be spotify project) is not ready yet, <br />so in the
            mean time you can click this button to generate an insult.
          </p>
          <button onClick={() => generateInsult()}>Insult Yourself</button>
        </div>
      )}
      <p className="read-the-docs">{insult}</p>
    </>
  );
}

export default App
