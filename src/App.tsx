import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import PlaylistEditor from './components/playlist'
import Search from './components/search'
import { Playlist, PlaylistItem, SearchItem } from './types'

const results = [
  {trackName: "Jackie Onasis", artistName: "Sammie Rae & Friends"},
  {trackName: "Superstition", artistName: "Stevie Wonder"},
  {trackName: "I'm Yours", artistName: "Jason Mraz"}
]

function App() {
  const [insult, setInsult] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>({name: "New Playlist", description: "New Playlist", items: []})

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
        {isPreview && <Search searchResults={searchResults} setSearchResults={setSearchResults} currentPlaylist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist} />}
        {isPreview && <PlaylistEditor playlist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist} />}
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
