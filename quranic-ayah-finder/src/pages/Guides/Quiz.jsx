import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
// import Guides from "./Guides"
// import Login from "../Login/Login"
import Cookies from "js-cookie"
import BackButton from "../../components/Buttons/BackButton";
import { VscDebugRestart } from "react-icons/vsc";
import { MdQuiz } from 'react-icons/md'
import { BsCardHeading } from 'react-icons/bs'

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

    console.log(quizQuestions)
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
        <div className="flex justify-between w-[70%] m-auto">
            <BackButton onClick={() =>history.back()}  />
            {/* <div> */}
                <h1 className="my-6 text-2xl font-bold">
                    Quiz {currentQuestion ? (<span>- {currentQuestion.topic_id.topic_name}</span>) : '' }
                </h1>
                {/* <p className="font-medium text-slate-500 my-1 mb-6 ">
                    Would you like to learn or test your knowledge?
                </p> */}
            {/* </div> */}
            <div className="w-[80px]"></div>
        </div>
        {
            currentQuestion ? (!endQuiz ? 
            // ("quiz has not ended") 
            (
                <div className="bg-sea-green p-6 py-8 lg:w-[60%] m-auto rounded max-w-[700px] min-h-[70vh] flex flex-col justify-between">
                    <h3 className="font-medium text-2xl m-6">{currentQuestion.question}</h3>
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
                    <button onClick={nextQuestion} className="w-[25%] mx-auto mt-[3%]">Next</button>
                </div>
            )
            : 
            (
                // "end of quiz"
                <div className="flex flex-col justify-evenly items-center  shadow  text-lg bg-[#55BDB3EE] p-6 py-8 w-[60%] m-auto rounded  min-h-[60vh]">
                    <div>
                        Well Done! The Quiz has now ended.
                    </div>
                    <div className="">
                        You scored <span className={(score < 5 ? "text-[red]" : "text-[green]")+" font-medium"}> {score}</span> in this quiz .
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center gap-4">
                        <div>
                            Would you like to 
                        </div>
                        {
                            !scoreSaved ? 
                            (
                                // <div className="flex flex-col  gap-4 m-auto">
                                //     <button onClick={restartQuiz}>Restart Quiz</button>
                                //     <button onClick={saveProgress}>Save my progess</button>
                                // </div>
                                <div className="flex gap-4 m-auto">
                                    {/* <button onClick={restartGuide}>Restart Guide </button> */}
                                    <BackButton onClick={restartQuiz} text="Restart Quiz" icon={<VscDebugRestart />} customStyle="hover:bg-medium-gray hover:text-navy-blue" />
                                    <BackButton onClick={saveProgress} text={<Link to={`/guides/topic/${id}/Quiz`} >Save my progress</Link>} icon={<MdQuiz />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                                    <BackButton onClick={restartQuiz} text={<Link to="/guides">Go back to topics</Link>} icon={<BsCardHeading />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                                    {/* <button ><Link to={`/guides/topic/${id}/Quiz`} >Take the quiz</Link></button> */}
                                </div>
                            ): 
                            (
                                <div>Score saved</div>
                            )
                        }
                         
                    </div>
                </div>
            )) : ''
        }
        
        </>
    )
}