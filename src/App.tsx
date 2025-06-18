import { useState } from 'react'
import './App.css'

function App() {
  const [insult, setInsult] = useState("")

  const generateInsult = async () => {
    const newInsult = "Don't be silly you're great! no instults here, check back in a couple of weeks to see the progress \n silly goose 🪿"

    setInsult(newInsult)
  }

  return (
    <>
      <h1>Cramming - Music for the Masses</h1>
      <div className="card">
        <button onClick={() => generateInsult()}>
          Insult Yourself
        </button>
        <p>
          My site (soon to be spotify project) is not ready yet, so in the mean time you can click this button to generate an insult.
        </p>
      </div>
      <p className="read-the-docs">
        {insult}
      </p>
    </>
  )
}

export default App
