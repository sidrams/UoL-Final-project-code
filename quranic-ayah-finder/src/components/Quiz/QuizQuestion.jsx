export default function QuizQuestion({currentQuestion, disabled, chosenAnswer, handleClick, nextQuestion}) {
    // quiz question slide that renders and displays all the questions

    // get color for button to be displayed
    const getColor = (chosenAnswer) => {
        const bgColor = chosenAnswer == currentQuestion.correct_answer ?  'bg-emerald-200' : 'bg-red-100'
        return bgColor
    }
    
    return (
        <div className="bg-sea-green p-6 py-8 lg:w-[60%] m-auto rounded max-w-[700px] min-h-[70vh] flex flex-col justify-between">
            {/* question */}
            <h3 className="font-medium text-2xl m-6">{currentQuestion.question}</h3>
            
            {/* answer options */}
            <div className="flex flex-col gap-4 px-24 my-4">
                {   // list of answers as an array, displayed
                    [currentQuestion.answer_1, currentQuestion.answer_2, currentQuestion.answer_3, currentQuestion.answer_4]
                    .map((question,i) => (
                        <button 
                            key={i}
                            value={question} 
                            disabled={disabled} 
                            className={chosenAnswer == question ? getColor(question) : ''} 
                            onClick={(e) => handleClick(e,'answer_1')}
                        >
                            {question}
                        </button>
                    ))
                }
            </div>

            {/* show if chosen answer is correct or wrong */}
            <div>
            {
                disabled ? ((chosenAnswer == currentQuestion.correct_answer ? 
                    ("Correct! ") : ("Wrong... ")) + (currentQuestion.note ? currentQuestion.note : '')) : ''
            }
            </div>

            {/* next button */}
            <button onClick={nextQuestion} className="w-[25%] mx-auto mt-[3%]">Next</button>
        </div>
    )
    
}