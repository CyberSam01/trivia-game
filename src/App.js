import { useState } from "react";
import Quiz from "./Quiz"
import StartPage from "./StartPage"
import SetQuiz from "./SetQuiz"

function App() {

  const [isQuiz, setIsQuiz] = useState(false)
  const [playAgain, setPlayAgain] = useState(false)
  const [questions, setQuestions] = useState({})  

  function startQuiz() {
    setIsQuiz(true)
  }

  function restartGame() {
    setQuestions({})
    setPlayAgain(false)
  }

  function startGame(data) {
    setQuestions(data)
    setPlayAgain(true)
  }

  return (
    <div>
     { isQuiz ?
        questions.length === undefined && !playAgain ?
          <SetQuiz startGame={startGame}/> 
        :
          <Quiz questions={questions}
                restartGame={restartGame}
          />
      :
      <StartPage startQuiz = {startQuiz} />}
    </div>
  );
}

export default App;
