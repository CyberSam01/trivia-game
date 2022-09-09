import { useEffect, useState} from "react"

function SetQuiz(props) {

    const[data, setData] = useState({
        numQuestions: 0,
        category: "",
        difficulty: ""
      })
    
    function getData(event, chosen) {
        setData((prev) => ({
            ...prev, 
            [chosen]: event.target.value
        }))
    }

    function GetApi(event) {
        event.preventDefault() 
        fetch(`https://opentdb.com/api.php?amount=${!data.numQuestions ? 10 : data.numQuestions}&category=${data.category}&difficulty=${data.difficulty}&type=multiple`)
        .then(res => res.json())
        .then(data => {
            data.results.map(item => {
                return (item.incorrect_answers.splice(Math.floor(Math.random() * 4), 0, item.correct_answer))
            }) 
            props.startGame(data.results)
        })
    }

    return (
        <div className="quiz">
            <form onSubmit={GetApi}>
                    <label>
                    Number of questions
                        <input name="numQuestions" onChange={(event) => getData(event,"numQuestions")} type="text" placeholder="Between 1 and 50"></input> 
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
        </div>
    )
}

export default SetQuiz