import { useContext, useEffect, useState } from "react"
import { Context } from "../../Context"
import { Link } from "react-router-dom"
import ProfileTiles from "../../components/Profile/ProfileTiles"
import Cookies from "js-cookie"
import BackButton from "../../components/Buttons/BackButton"
import { RiNumbersFill, RiTimeFill,RiTrophyFill } from 'react-icons/ri'

export default function Profile() {
    const { loggedUser, setLoggedUser } = useContext(Context)
    const csrftoken = Cookies.get('csrftoken');
    const [profileData, setProfileData] = useState()

    useEffect(() => {
        fetch('http://127.0.0.1:8000/profile', {
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
                setProfileData(json)
                console.log(json)
            })
            .catch(error => console.log(error))
    }, [])

    console.log(loggedUser)
    return (
        <>
        {/* <h1>Profile</h1>
        <p>hi {loggedUser.username}</p> */}

        {/* <div>
            see your scores <Link to="scores">here</Link>
        </div> */}

        <div className="xl:w-[70%] lg:w-[85%] m-auto flex flex-col gap-4">
            {/* <h1 className="hidden">Scores</h1> */}
            
            <div className="flex justify-between">
                <div className='flex flex-col justify-between items-start tracking-wide w-3/4'>
                    <h1 className="text-2xl font-semi text-left">
                        Your Profile
                    </h1>
                    <p className="text-sea-green text-lg mt-3">
                        Logged in as  
                        <span className="font-bold">
                            {" @" +loggedUser.username}
                        </span>
                    </p>
                </div>

                <Link to="/profile/scores"><BackButton text="View All scores" icon={<RiNumbersFill />}/></Link>
            </div>

            {/* summary of completed attempts */}
            {
                profileData && <ProfileTiles profileData={profileData} />
            }

            <div className='flex flex-col w-full'>
                <div className='flex justify-between my-6 tracking-wide text-gray-500 w-3/4'>
                    <h2 className=''>
                        Showing all posts for <span className='font-bold'>{loggedUser.username}</span>
                    </h2>
                    <p>sort by <span className='font-bold'>*</span></p>
                </div>

                {/* all progress components */}
                <div className='flex'>
                    
                    {/* indivisual progress components */}
                    {/* <IndivisualProgressComponent scoreData={scoreData} /> */}

                    {/* List of topics that quizzes have been attempted for */}
                    {/* <AttemptedTopicList getTopicsAttempted={getTopicsAttempted} /> */}
                </div>

                
            </div>
        </div>
        </>
    )
}