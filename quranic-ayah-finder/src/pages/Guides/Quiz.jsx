import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
// import Guides from "./Guides"
// import Login from "../Login/Login"
import Cookies from "js-cookie"

export default function Quiz(props) {
    const {id} = useParams()
    const csrftoken = Cookies.get('csrftoken');
    const [quizQuestions, setQuizQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState()
    const [chosenAnswer, setChosenAnswer] = useState()
    const [score, setScore] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [endQuiz, setEndQuiz] = useState(false)
    const [scoreSaved, setScoreSaved] = useState(false)

    // get questions for the chosen topic
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/quizQuestions/'+id, {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((json) =>{
                setQuizQuestions(json.Questions)
                setCurrentQuestion(json.Questions[0])
            })
            .catch(error => console.log(error))
    }, [])

    // display next question when pressed
    const nextQuestion = () => {
        const index = quizQuestions.indexOf(currentQuestion);
        console.log(index)
        if(index >= 0 && index < quizQuestions.length - 1) {
            setCurrentQuestion(quizQuestions[index + 1])
            setChosenAnswer(null)
            setDisabled(false)
        }
        else {
            setEndQuiz(true)
        }
    }

    // display if clicked answer is correct or incorrect
    const handleClick = (e,answer) => {
        setChosenAnswer(e.target.value)
        setDisabled(true)
        if(e.target.value == currentQuestion.correct_answer) {
            setScore(score + 1)
            console.log(score , "score")
        }
    }

    // get color for button to be displayed
    const getColor = (chosenAnswer) => {
        const bgColor = chosenAnswer == currentQuestion.correct_answer ?  'bg-emerald-200' : 'bg-red-100'
        return bgColor
    }

    // reset all variables to restart quiz
    const restartQuiz = () => {
        setEndQuiz(false)
        setScore(0)
        setCurrentQuestion(quizQuestions[0])
        setChosenAnswer(null)
        setDisabled(false)
    }

    // saves progress for a logged in user
    const saveProgress = () => {
        fetch(`http://127.0.0.1:8000/api/UserQuizProgress/topic/`+id, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            body: JSON.stringify({"score":score})
        })
        .then((response) => response.json())
        .then((json) =>{
            console.log("score saved")
            setScoreSaved(true)
        })
        .catch(error => console.log(error))
        // console.log(`http://127.0.0.1:8000/api/UserQuizProgress/topic/`+id)
    }

    return (
        <>
        <h1>Quiz</h1>
        {
            currentQuestion ? (!endQuiz ? 
            // ("quiz has not ended") 
            (
                <div className="bg-[#55BDB3] p-6 py-8 lg:w-[60%] m-auto rounded-xl">
                    <h3>{currentQuestion.question}</h3>
                    <div className="flex flex-col gap-4 px-24 my-4">
                        <button value={currentQuestion.answer_1} disabled={disabled} className={chosenAnswer == currentQuestion.answer_1 ? getColor(currentQuestion.answer_1) : ''} onClick={(e) => handleClick(e,'answer_1')}>{currentQuestion.answer_1}</button>
                        <button value={currentQuestion.answer_2} disabled={disabled} className={chosenAnswer == currentQuestion.answer_2 ? getColor(currentQuestion.answer_2) : ''} onClick={(e) => handleClick(e,'answer_2')}>{currentQuestion.answer_2}</button>
                        <button value={currentQuestion.answer_3} disabled={disabled} className={chosenAnswer == currentQuestion.answer_3 ? getColor(currentQuestion.answer_3) : ''} onClick={(e) => handleClick(e,'answer_3')}>{currentQuestion.answer_3}</button>
                        <button value={currentQuestion.answer_4} disabled={disabled} className={chosenAnswer == currentQuestion.answer_4 ? getColor(currentQuestion.answer_4) : ''} onClick={(e) => handleClick(e,'answer_4')}>{currentQuestion.answer_4}</button>
                    </div>
                    <div>
                    {
                        disabled ? ((chosenAnswer == currentQuestion.correct_answer ? 
                            ("Correct! ") : ("Wrong... ")) + (currentQuestion.note ? currentQuestion.note : '')) : ''
                    }
                    </div>
                    <button onClick={nextQuestion}>Next</button>
                </div>
            )
            : 
            (
                // "end of quiz"
                <div className="bg-[#55BDB3] p-6 py-8 w-[60%] m-auto rounded-xl">
                    <div>
                        Well Done! The Quiz has now ended.
                    </div>
                    <div>
                        You scored {score} in this quiz.
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center gap-4">
                        <div>
                            Would you like to 
                        </div>
                        {
                            !scoreSaved ? 
                            (
                                <div className="flex flex-col  gap-4 m-auto">
                                    <button onClick={restartQuiz}>Restart Quiz</button>
                                    <button onClick={saveProgress}>Save my progess</button>
                                </div>
                            ): 
                            (
                                <div>Score saved</div>
                            )
                        }
                         
                        <Link to="/guides"> <button>Go back to topics</button></Link>
                    </div>
                </div>
            )) : ''
        }
        
        </>
    )
}