import bgImg from "./85418.jpg"

function StartPage(props) {
    return (
        <div className="App">
        <img src={bgImg} className="bgImg"></img>
        <h1>Quizzical</h1>
        <button className="start-btn btn" type="submit" onClick={props.startQuiz}>Start quiz</button>
      </div>
    )
}

export default StartPage