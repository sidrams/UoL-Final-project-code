import { RiNumbersFill, RiTimeFill,RiTrophyFill } from 'react-icons/ri'

export default function IndivisualProgressComponent({scoreData}) {
    const getDate = (scoreDate) => {
        return new Date(scoreDate).getDate()
    }

    const getMonthName = (scoreDate) => {
        return new Date(scoreDate).toLocaleDateString('en-us', {  month: 'short' })
    }

    const getLastTopicScore = (topic_id) => {
        let lastScore = 0
        for (var i = 0; i < scoreData.length; i++) {
            if (scoreData[i].quiz_topic_id.id == topic_id) {
                lastScore = scoreData[i].score
                break;
            }
        }
        return lastScore
    }

    const getHighestTopicScore = (topic_id) => {
        let highestScore = 0
        scoreData.map((score,i) => {
            if(score.quiz_topic_id.id == topic_id) {
                highestScore = score.score > highestScore ? score.score : highestScore
            }
        })
        return highestScore
    }

    return (
        <div className='w-3/4'>
            {
                scoreData.map((score,i) => (
                    <div className='flex my-10'>
                        <div className='w-[10%] flex flex-col text-slate-400'>
                            <span className='text-2xl font-bold'>{getDate(score.time_taken_at)}</span>
                            <span className='tracking-wider'>{getMonthName(score.time_taken_at)}</span>
                        </div>
                        <div className='w-[90%] text-slate-400 font-medium tracking-wider bg-custom-gray xl:p-8 p-6 shadow-md w-[70%] overflow-auto rounded flex flex-col justify-center text-left gap-2'>
                            <h4 className='font-bold text-gray-600'>{score.quiz_topic_id.topic_name}</h4>
                            <div className='flex justify-start gap-[5%]'>
                                <p className='flex items-center gap-3'><RiNumbersFill />Score {score.score}</p>
                                <p className='flex items-center gap-3'><RiTimeFill />Last score achieved in topic : {getLastTopicScore(score.quiz_topic_id.id)}</p>
                                <p className='flex items-center gap-3'><RiTrophyFill />Highest score achieved in topic : {getHighestTopicScore(score.quiz_topic_id.id)}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}