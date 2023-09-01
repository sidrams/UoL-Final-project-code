import { useContext, useEffect, useState } from "react"
import { Context } from "../../Context"
import { Link } from "react-router-dom"
import ProfileTiles from "../../components/Profile/ProfileTiles"
import Cookies from "js-cookie"
import BackButton from "../../components/Buttons/BackButton"
import { RiNumbersFill, RiTimeFill,RiTrophyFill } from 'react-icons/ri'
import PostComponent from "../../components/Posts/PostComponent"
import { BiSearchAlt2 } from "react-icons/bi"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import AttemptedTopicList from "../../components/ProfileScore/AttemptedTopicList"

export default function Profile() {
    const { loggedUser, setLoggedUser } = useContext(Context)
    const csrftoken = Cookies.get('csrftoken');
    const [profileData, setProfileData] = useState()
    const [inputText, setInputText] = useState()
    const handleChange = (e) => {
        setInputText(e.target.value.toLowerCase())
    }

    // get profile data
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

    const getTopicsAttempted = () => {
        let topics = []
        profileData.progress.map((quiz,i) => {
            topics.push(quiz.quiz_topic_id.topic_name)
        })
        return([... new Set(topics)])
    }

    return (
        <div className="xl:w-[70%] lg:w-[85%] m-auto flex flex-col gap-4">

            {/* username of user and link to user progress page */}
            <ProfileHeader />

            {
                profileData && 
                (
                    <>
                    {/* summary of completed attempts */}
            {/* {
                profileData && 
            } */}

            <ProfileTiles profileData={profileData} />
            
            <div className='flex flex-col w-full'>
                <div className='flex justify-between my-6 tracking-wide text-gray-500 w-3/4'>
                    <h2 className=''>
                        Showing all posts for <span className='font-bold'>{loggedUser.username}</span>
                    </h2>

                    {/* search bar to search user's posts */}
                    <form method="GET" action="" className="w-[40%] flex items-center gap-1">
                        <BiSearchAlt2 className="text-[1.5rem] text-sea-green" /><input type="text" className='w-full shadow' name="q" placeholder="Search posts..." onChange={handleChange} />
                    </form>
                </div>

                {/* all posts components */}
                <div className='flex'>
                    
                    {/* indivisual posts components */}
                    {/* {profileData && } */}
                    <PostComponent posts={profileData.posts} inputText={inputText} />
                    {/* <IndivisualProgressComponent scoreData={scoreData} /> */}

                    {/* List of topics that quizzes have been attempted for */}
                    <AttemptedTopicList getTopicsAttempted={getTopicsAttempted} />
                </div>

                
            </div>
                    </>
                )
            }
            
        </div>
    )
}