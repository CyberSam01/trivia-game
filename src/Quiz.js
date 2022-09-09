import { useState, useEffect } from "react"

function Quiz(props) {

    const[isEndGame, setEndGame] = useState(false)
    const [score, setScore] = useState(0)

    function decodeHtml(html) { 
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.textContent;
    }

    function submitAnswer(event) {
        props.questions.map((question) => {
            let name = event.target.name
            let value = event.target.value
            if (name === value) {
                return (question.isCorrect = true, question[value] = "correct-answer")
            } else {return (question[value] = "fault")}            
        })
    }

    function checkAnswer() {
        props.questions.map(question => {
            if (!question[question.correct_answer]) {
                return (question.isCorrect = false, question[question.correct_answer] = "correct-answer")
            } question.isCorrect && setScore((prev) => (prev += 1))
        })
        setEndGame(true)
    }
    console.log(score);

    return (
        <div className="quiz">
                <div className="questions-div">
                    {props.questions.map((question, index) => {
                        return (
                            <div className="question-div">
                                <h4 value={index} key={index} className="question">{decodeHtml(question.question)}</h4>
                                <div className="answer-btns">
                                    {question.incorrect_answers.map((answ) => {
                                        console.log(question[answ])
                                        return (
                                            <button 
                                                name={question.correct_answer} 
                                                value={answ}
                                                onClick={(event) => submitAnswer(event)} 
                                                className={`answer-btn btn ${isEndGame && (question[answ])} ${isEndGame && "noHover"}`}
                                                disabled={isEndGame}>
                                                {decodeHtml(answ)}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    {!isEndGame ? 
                        <button className="btn check-answers-btn" onClick={checkAnswer}>Check answers</button>
                    :   
                        <div className="score-btn-div">
                            <h6 className="score">{`You have ${score} out of ${props.questions.length} correct`}</h6>
                            <button className="btn check-answers-btn" onClick={props.restartGame}>Play Again</button>
                        </div>}
                </div> 
        </div>
    )
}

export default Quiz

