import { MdOutlineQuestionAnswer } from 'react-icons/md'
import { RiNumbersFill, RiTimeFill,RiTrophyFill } from 'react-icons/ri'

export default function ProgressTiles({scoreData}) {
    const getAvgScore = () => {
        let scoreCount = 0
        scoreData.map((score,i) => {
            scoreCount += score.score
        })

        return Math.round(scoreCount/scoreData.length)
    }

    const gethighestScore = () => {
        let highestScore = 0
        scoreData.map((score,i) => {
            highestScore = score.score > highestScore ? score.score : highestScore
        })

        return highestScore
    }

    return (
        <div className="flex justify-between text-slate-500">
            <div className='flex flex-col justify-center items-center gap-3 text-lg tracking-wider bg-medium-gray shadow p-8 xl:px-12 lg:px-6 w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                <div className='text-3xl flex justify-center items-center gap-4'>
                    <MdOutlineQuestionAnswer />
                    <span>{scoreData.length}</span>
                </div>
                <div>
                    Quizzes Attempted
                </div>
            </div>
            <div className='flex flex-col  justify-center items-center gap-4 text-lg tracking-wider bg-medium-gray shadow p-8 xl:px-12 lg:px-6 w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                <div className='text-3xl flex justify-center items-center gap-4'>
                    <RiNumbersFill />
                    <span>{getAvgScore()}</span>
                </div>
                Average Score
            </div>
            <div className='flex flex-col justify-center items-center gap-4 text-lg tracking-wider bg-medium-gray shadow p-8 xl:px-12 lg:px-6  w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                <div className='text-3xl flex justify-center items-center gap-4'>
                    <RiTrophyFill />
                    <span>{gethighestScore()}</span>
                </div>
                Highest Score acieved
            </div>
            <div className='flex flex-col justify-center items-center gap-4 text-lg tracking-wider bg-medium-gray shadow p-8 xl:px-12 lg:px-6 w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                <div className='text-3xl flex justify-center items-center gap-4'>
                    <RiTimeFill />
                    <span>{new Date(scoreData[0].time_taken_at).toLocaleDateString()}</span>
                </div>
                Last attempt
            </div>
        </div>
    )
}