import { useState, useEffect } from "react"

function Quiz() {

    const[startGame, setStartGame] = useState(false)
    const[isEndGame, setEndGame] = useState(false)
    const[effect, setEffect] = useState(false)

    const[data, setData] = useState({
        numQuestions: 0,
        category: "",
        difficulty: ""
      })
      
    const [questions, setQuestions] = useState({})    
    
    function getData(event, chosen) {
        setData((prev) => ({
            ...prev, 
            [chosen]: event.target.value
        }))
    }

    function GetApi(event) {
        event.preventDefault() 
        fetch(`https://opentdb.com/api.php?
        amount=${!data.numQuestions ? 10 : data.numQuestions}&category=${data.category}&difficulty=${data.difficulty}&type=multiple`)
        .then(res => res.json())
        .then(data => {
            data.results.map(item => {
                return (item.incorrect_answers.splice(Math.floor(Math.random() * 4), 0, item.correct_answer))
            }) 
            setQuestions(data.results)
            setStartGame(true)
        })
    }

    function decodeHtml(html) { 
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.textContent;
    }

    function submitAnswer(event) {
        questions.map((question) => {
            console.log(event.target);

            // the correct answer
            let name = event.target.name
            // the button answer
            let value = event.target.value

            if (name === value) {
                return (question.isCorrect = true, question[value] = "correct-answer")
            } else {return (question[value] = "fault")}            
        })
    }

    console.log(questions);

    function checkAnswer() {
        questions.map(question => {
            if (!question[question.correct_answer]) {
                return (question.isCorrect = false, question[question.correct_answer] = "correct-answer")
            }
        })
        setEndGame(true)
    }

    return (
        <div className="quiz">
            {startGame ?
                <div className="questions-div">
                    {questions.map((question, index) => {
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
                    <button className="btn check-answers-btn" onClick={checkAnswer}>Check answers</button>
                </div> 
            :
                <form onSubmit={GetApi}>
                    <label>
                    Number of questions
                        <input name="numQuestions" onChange={(event) => getData(event,"numQuestions")} type="text" placeholder="Between 1 and 100"></input> 
                    </label>
                    <label>
                    Choose your category
                    <select name="category" value="category" onChange={(event) => getData(event,"category")}>
                        <option value="">Any Categorie </option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals & Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebreties</option>
                        <option value="27">Animals</option>
                    </select>
                    </label>
                    <label>
                    Choose your difficulty
                    <select onChange={(event) => getData(event,"difficulty")}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    </label>
                    <button className="questions-btn btn">Get Questions</button>
                </form>
            }
        </div>
    )
}

export default Quiz