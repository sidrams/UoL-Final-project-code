import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context';
import ProgressTiles from '../../components/ProfileScore/ProgressTiles';
import IndivisualProgressComponent from '../../components/ProfileScore/IndivisualProgressComponent';
import AttemptedTopicList from '../../components/ProfileScore/AttemptedTopicList';

export default function ProfileScores() {
    const csrftoken = Cookies.get('csrftoken');
    const { loggedUser, setLoggedUser } = useContext(Context)
    const [scoreData, setScoreData] = useState()

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/UserQuizProgress', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            })
            .then((response) => response.json())
            .then((json) =>{
                console.log(json.Progress)
                setScoreData(json.Progress)
            })
            .catch(error => console.log(error))
    }, [])

    // console.log(loggedUser)
    

    

    const getTopicsAttempted = () => {
        let topics = []
        scoreData.map((score,i) => {
            topics.push(score.quiz_topic_id.topic_name)
        })
        return([... new Set(topics)])

    }

    return (
        <>
        {
            scoreData && 
            (
                <div className="xl:w-[70%] lg:w-[85%] m-auto flex flex-col gap-4">
                    <h1 className="hidden">Scores</h1>
                    
                    <h2 className="my-6 text-2xl font-semi text-left">
                        Your Progress
                    </h2>

                    {/* <div className="flex justify-between text-slate-500">
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
                    </div> */}
                    <ProgressTiles scoreData={scoreData} />

                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between my-6 tracking-wide text-gray-500 w-3/4'>
                            <h2 className=''>
                                Showing all progress for <span className='font-bold'>{loggedUser.username}</span>
                            </h2>
                            <p>sort by <span className='font-bold'>*</span></p>
                        </div>

                        {/* all progress components */}
                        <div className='flex'>
                            
                            {/* indivisual progress components */}
                            <IndivisualProgressComponent scoreData={scoreData} />
                            {/* <div className='w-3/4'>
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
                            </div> */}


                            {/* List of topics that quizzes have been attempted for */}
                            <AttemptedTopicList getTopicsAttempted={getTopicsAttempted} />
                            {/* <div className='w-1/4 tracking-wide text-gray-500 font-medium  text-left px-10 mt-8'>
                                <h4 className='uppercase'>Topics completed</h4>
                                <div>
                                    {
                                        getTopicsAttempted().map((topic,i) => (
                                            <div key={i} className='my-4 flex items-center gap-2'>
                                                <div className='bg-sea-green-opacity p-2 rounded-full text-[2rem]'><TopicIcons topic={topic} /> </div>
                                                {topic}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div> */}
                        </div>

                        
                    </div>
                </div>
            )
        }
        
        
        </>
    )
}