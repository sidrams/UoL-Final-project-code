import { useContext, useEffect, useRef, useState } from "react"
import {Context} from '../../Context'
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import BackButton from "../../components/Buttons/BackButton";
import QuizQuestion from "../../components/Quiz/QuizQuestion";
import EndQuizComponent from "../../components/Quiz/EndQuizComponent";
import LoginModalComponent from "../../components/Login/LoginModalComponent";
import { Toast } from 'primereact/toast';

export default function Quiz(props) {
    const { loggedUser, setLoggedUser } = useContext(Context)
    const {id} = useParams() // topic id
    const csrftoken = Cookies.get('csrftoken'); // csrf token to save logged in user progress
    const [quizQuestions, setQuizQuestions] = useState([]) // get quiz question for the chosen topic
    const [currentQuestion, setCurrentQuestion] = useState() // set current question to be displayed
    const [chosenAnswer, setChosenAnswer] = useState() // set answer chosen by user
    const [score, setScore] = useState(0)   // set and update score based on answers chosen by user
    const [disabled, setDisabled] = useState(false) // disable buttons after a user chooses an answer
    const [endQuiz, setEndQuiz] = useState(false) // show last slide with score when quiz ends
    const [scoreSaved, setScoreSaved] = useState(false) // set to true is user successfully saved the score
    const [showLogin, setShowLogin] = useState(false) // show login component if user wants to save progress
    // show message if no answer selected by user
    const toast = useRef(null); 
    const show = () => {
        toast.current.show({ severity: 'info', summary: '', detail: 'Please select an answer' });
    };

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
        if (chosenAnswer) {
            const index = quizQuestions.indexOf(currentQuestion);
            if(index >= 0 && index < quizQuestions.length - 1) {
                setCurrentQuestion(quizQuestions[index + 1])
                setChosenAnswer(null)
                setDisabled(false)
            }
            else {
                setEndQuiz(true)
            }
        } 
        else {
            // alert('no answer se;ected')
            show()
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
        loggedUser ? 
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
        .then((response) => setScoreSaved(true))
        .catch(error => console.log(error))

        : setShowLogin(true); alert('User needs to be Logged in to save progress')
    }

    return (
        <>
        {/* Login component if required */}
        {
            showLogin && 
            <LoginModalComponent setShowLogin={setShowLogin} />
        }
        
        {/* header */}
        <div className="flex justify-between w-[70%] m-auto">
        <Toast ref={toast} />
            <BackButton onClick={() =>history.back()}  />

            {/* heading in the format 'Quiz - Topic Name' */}
            <h1 className="my-6 text-2xl font-bold">
                Quiz {currentQuestion ? (<span>- {currentQuestion.topic_id.topic_name}</span>) : '' }
            </h1>
            
            <div className="w-[80px]"></div>
        </div>

        {/* questions section */}
        {
            currentQuestion ? (!endQuiz ? 
            //  show quiz questions
            <QuizQuestion currentQuestion={currentQuestion} disabled={disabled} chosenAnswer={chosenAnswer} handleClick={handleClick} nextQuestion={nextQuestion} />
            : 
            // "end of quiz"
            <EndQuizComponent id={id} score={score} scoreSaved={scoreSaved} restartQuiz={restartQuiz} saveProgress={saveProgress} />
            ) : ''
        }
        
        </>
    )
}