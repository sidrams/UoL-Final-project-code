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

                    {/* summary of completed attempts */}
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

                            {/* List of topics that quizzes have been attempted for */}
                            <AttemptedTopicList getTopicsAttempted={getTopicsAttempted} />
                        </div>

                        
                    </div>
                </div>
            )
        }
        
        
        </>
    )
}