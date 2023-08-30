import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { MdOutlineQuestionAnswer, MdQuiz } from 'react-icons/md'
import { RiNumbersFill, RiTimeFill,RiTrophyFill } from 'react-icons/ri'
import { Context } from '../../Context';

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
    const getAvgScore = () => {
        let scoreCount = 0
        scoreData.map((score,i) => {
            scoreCount += score.score
        })

        return scoreCount/scoreData.length
    }
    return (
        <>
        <div className="w-[70%] m-auto flex flex-col gap-4">
            <h1 className="hidden">Scores</h1>
            
            <h2 className="my-6 text-2xl font-semi text-left">
                Your Progress
            </h2>

            <div className="flex justify-between text-slate-500">
                <div className='flex flex-col gap-3 text-lg tracking-wider bg-medium-gray shadow p-8 px-12 w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                    <div className='text-3xl flex justify-center items-center gap-4'>
                        <MdOutlineQuestionAnswer />
                        <span>{scoreData.length}</span>
                    </div>
                    <div>
                        Quizzes Attempted
                    </div>
                </div>
                <div className='flex flex-col gap-4 text-lg tracking-wider bg-medium-gray shadow p-8 px-12 w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                    <div className='text-3xl flex justify-center items-center gap-4'>
                        <RiNumbersFill />
                        <span>5</span>
                    </div>
                    Average Score
                </div>
                <div className='flex flex-col gap-4 text-lg tracking-wider bg-medium-gray shadow p-8 px-12 w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                    <div className='text-3xl flex justify-center items-center gap-4'>
                        <MdQuiz />
                        <span>5</span>
                    </div>
                    Last Quiz taken
                </div>
                <div className='flex flex-col gap-4 text-lg tracking-wider bg-medium-gray shadow p-8 px-12 w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                    <div className='text-3xl flex justify-center items-center gap-4'>
                        <RiTimeFill />
                        <span>5</span>
                    </div>
                    Last attempt
                </div>
            </div>

            <div className='flex flex-col w-full'>
                    <div className='flex justify-between my-6 tracking-wide text-gray-500 w-3/4'>
                            <h2 className=''>
                                Showing all progress for <span className='font-bold'>{loggedUser.username}</span>
                            </h2>
                            <p>sort by <span className='font-bold'>*</span></p>
                        </div>

                    {/* all progress components */}
                    <div className='flex'>
                        

                        <div className='w-3/4'>
                            <div className='flex'>
                                <div className='w-[10%] flex flex-col text-slate-400'>
                                    <span className='text-2xl font-bold'>21</span>
                                    <span className='tracking-wider'>SEP</span>
                                </div>
                                <div className='w-[90%] text-slate-400 font-medium tracking-wider bg-custom-gray p-8 shadow-md w-[70%] overflow-auto rounded flex flex-col justify-center text-left gap-2'>
                                    <h4 className='font-bold text-gray-600'>Chapter name</h4>
                                    <div className='flex justify-start gap-[15%]'>
                                        <p className='flex items-center gap-3'><RiNumbersFill />Score</p>
                                        <p className='flex items-center gap-3'><RiTimeFill />last score achieved</p>
                                        <p className='flex items-center gap-3'><RiTrophyFill />highest score achieved in topic</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='w-1/4 tracking-wide text-gray-500 font-medium uppercase text-left px-4'>
                            Topics completed
                        </div>
                    </div>

                
            </div>
        </div>
        </>
    )
}