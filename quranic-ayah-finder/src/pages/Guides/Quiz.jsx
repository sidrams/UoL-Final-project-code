import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

export default function Quiz(props) {
    const {id} = useParams()
    const [quizQuestions, setQuizQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState()
    const [chosenAnswer, setChosenAnswer] = useState()
    const [score, setScore] = useState(0)
    const [color, setColor] = useState({
        // answer_1: false,
        // answer_2: false,
        // answer_3: false,
        // answer_4: false,
    })
    const [disabled, setDisabled] = useState(false)
    const [endQuiz, setEndQuiz] = useState(false)

    // const location = useLocation();
    // console.log(props, " props");
    // console.log(location, " useLocation Hook");
    // const data = location.state?.data;
    const nextQuestion = () => {
        const index = quizQuestions.indexOf(currentQuestion);
        console.log(index)
        if(index >= 0 && index < quizQuestions.length - 1) {
        //    nextItem = array[index + 1]
            setCurrentQuestion(quizQuestions[index + 1])
            setColor({})
            setDisabled(false)
        }
        else {
            setEndQuiz(true)
        }
    }

    const handleClick = (e,answer) => {
        console.log(e.target.value, "in handle Click")
        // console.log(color && currentQuestion.answer_1 == currentQuestion.correct_answer, 'codition is?')
        setChosenAnswer(e.target.value)
        setColor({
            // ...color,
            [answer]:true
        })
        console.log(color)
        setDisabled(true)
        if(e.target.value == currentQuestion.correct_answer) {
            setScore(score + 1)
            console.log(score , "score")
        }
    }

    const getColor = (chosenAnswer) => {
        // let bgColor = ''
        // console.log(chosenAnswer == currentQuestion.correct_answer, 'correct answer?')
        const bgColor = chosenAnswer == currentQuestion.correct_answer ?  'bg-emerald-200' : 'bg-red-100'
        return bgColor
    }

    const restartQuiz = () => {
        setEndQuiz(false)
        setScore(0)
        setCurrentQuestion(quizQuestions[0])
        setChosenAnswer(null)
        setColor({})
        setDisabled(false)
    }

    console.log("id id: "+id)
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

    // console.log(quizQuestions)
    console.log(currentQuestion)
    return (
        <>
        <h1>Quiz</h1>
        {/* <h1> {data ? data : "Go to Home"} </h1> */}
        {/* {
            quizQuestions ? 
            (   
                <>
                <div>
                    {quizQuestions.map((question,i) => (
                        <h3>{question.question}</h3>
                    ))}
                </div>
                </>
            ) :''
        } */}
        {
            currentQuestion ? (!endQuiz ? 
            // ("quiz has not ended") 
            (
                <div className="bg-[#55BDB3] p-6 py-8 w-[60%] m-auto rounded-xl">
                    <h3>{currentQuestion.question}</h3>
                    <div className="flex flex-col gap-4 px-24 my-4">
                        <button 
                            value={currentQuestion.answer_1} 
                            disabled={disabled}
                            // className={(color && currentQuestion.answer_1 == currentQuestion.correct_answer) ? 'bg-emerald-200' : 'bg-red-100'}
                            // className={color ? (currentQuestion.answer_1 == currentQuestion.correct_answer ? 'bg-emerald-200' : 'bg-red-100'):''}
                            className={color.answer_1 ? getColor(currentQuestion.answer_1) : ''}
                            // className={(e) => (e.target.value)}
                            onClick={(e) => {
                                // console.log(e.target.value)
                                console.log(color)
                                // getColor(currentQuestion.answer_1)
                                // e.target.value == currentQuestion.correct_answer ? setColor('emerald-200') : setColor('red-100')
                                handleClick(e,'answer_1')
                            }}
                        >
                            {currentQuestion.answer_1}
                        </button>
                        <button value={currentQuestion.answer_2} disabled={disabled} className={color.answer_2 ? getColor(currentQuestion.answer_2) : ''} onClick={(e) => handleClick(e,'answer_2')}>{currentQuestion.answer_2}</button>
                        <button value={currentQuestion.answer_3} disabled={disabled} className={color.answer_3 ? getColor(currentQuestion.answer_3) : ''} onClick={(e) => handleClick(e,'answer_3')}>{currentQuestion.answer_3}</button>
                        <button value={currentQuestion.answer_4} disabled={disabled} className={color.answer_4 ? getColor(currentQuestion.answer_4) : ''} onClick={(e) => handleClick(e,'answer_4')}>{currentQuestion.answer_4}</button>
                    </div>
                    <div>
                    {
                        disabled ? (chosenAnswer == currentQuestion.correct_answer ? 
                            ("Correct! " + currentQuestion.note) : ("Wrong... "+ currentQuestion.note)) : ''
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
                         <div className="flex flex-col  gap-4 m-auto">
                            <button onClick={restartQuiz}>Restart Quiz</button>
                            <button>Save my progess</button>
                        </div>
                    </div>
                </div>
            )) : ''
        }
        
        </>
    )
}