import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import Playlist from './components/playlist'
import Search from './components/search'
function App() {
  const [insult, setInsult] = useState("")
  const [isPreview, setIsPreview] = useState(false)

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
        {isPreview && <Playlist />}
      </div>
      {!isPreview && (
        <div className="card">
          <button onClick={() => generateInsult()}>Insult Yourself</button>
          <p>
            My site (soon to be spotify project) is not ready yet, so in the
            mean time you can click this button to generate an insult.
          </p>
        </div>
      )}
      <p className="read-the-docs">{insult}</p>
    </>
  );
}

export default App
