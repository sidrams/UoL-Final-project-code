export default function QuizQuestion({currentQuestion, disabled, chosenAnswer, handleClick, nextQuestion}) {
    // get color for button to be displayed
    const getColor = (chosenAnswer) => {
        const bgColor = chosenAnswer == currentQuestion.correct_answer ?  'bg-emerald-200' : 'bg-red-100'
        return bgColor
    }
    
    return (
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
    
}