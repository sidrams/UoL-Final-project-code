import { RiNumbersFill, RiTimeFill,RiTrophyFill } from 'react-icons/ri'

export default function IndivisualProgressComponent({scoreData, inputText}) {
    // show each of the the quiz progress saved by user

    // helper functions for date
    const getDate = (scoreDate) => {
        return new Date(scoreDate).getDate()
    }
    const getMonthName = (scoreDate) => {
        return new Date(scoreDate).toLocaleDateString('en-us', {  month: 'short' })
    }

    // get the last score of user for a given topic
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

    // get the highest score of user for a given topic
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
            {   // render each of the saved attempts along with score, last and highest score achieved
                scoreData.length > 0 ?
                (
                    <>
                    {
                        scoreData.filter(data => {
                            if (inputText === '') {
                            return data;
                            } else if (
                                data.quiz_topic_id.topic_name.toLowerCase().includes(inputText)
                            ) {
                            return data;
                            }
                        }).map((score,i) => (
                            <div className='flex my-10'>
                                {/* date of attempt */}
                                <div className='w-[10%] flex flex-col text-slate-400'>
                                    <span className='text-2xl font-bold'>{getDate(score.time_taken_at)}</span>
                                    <span className='tracking-wider'>{getMonthName(score.time_taken_at)}</span>
                                </div>

                                {/* score, last score and highest score in topic */}
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
                    </>
                ) : //if no progress saved
                <p className='flex justify-between my-6 pr-12 tracking-wide text-sea-green text-left'>
                    No Progress to show. Attempt some quizzes and make sure to save your progress to see some results here.
                </p>
            }
            
        </div>
    )
}