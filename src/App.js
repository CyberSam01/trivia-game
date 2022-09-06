import { useState } from "react";
import bgImg from "./85418.jpg"
import Quiz from "./Quiz"

function App() {

  const [quiz, setQuiz] = useState(false)

  function startQuiz() {
    setQuiz(true)
  }


  return (
    <div>
     { quiz ?
      <Quiz />
      :
      <div className="App">
        <img src={bgImg} className="bgImg"></img>
        <h1>Quizzical</h1>
        <button className="start-btn btn" type="submit" onClick={startQuiz}>Start quiz</button>
      </div> }
    </div>
  );
}

export default App;
