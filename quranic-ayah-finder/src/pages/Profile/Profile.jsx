import { useContext, useEffect, useState } from "react"
import { Context } from "../../Context"
import ProfileTiles from "../../components/Profile/ProfileTiles"
import Cookies from "js-cookie"
import PostComponent from "../../components/Posts/PostComponent"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import AttemptedTopicList from "../../components/ProfileScore/AttemptedTopicList"
import SearchBar from "../../components/SearchBarSub/SearchBar"
import { useParams } from "react-router-dom"

export default function Profile() {
    const { username } = useParams() // username of the user to view the profile 
    const { loggedUser, setLoggedUser } = useContext(Context) // get logged in user
    const csrftoken = Cookies.get('csrftoken');
    const [profileData, setProfileData] = useState() // profile data
    
    // handle search bar input
    const [inputText, setInputText] = useState() 
    const handleChange = (e) => {
        setInputText(e.target.value.toLowerCase())
    }

    // get profile data
    useEffect(() => {
        let query = ''
        if(loggedUser.username == username) 
            // if user is viewing their own profile
            query = 'http://127.0.0.1:8000/profile'
        else 
            // if user is viewing a public profile
            query = 'http://127.0.0.1:8000/profile/'+username

        // fetch profile data for the chosen user
        fetch(query, {
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
        // gets topics user has saved from quizzes
        let topics = []
        profileData.progress.map((quiz,i) => {
            topics.push(quiz.quiz_topic_id.topic_name)
        })
        return([... new Set(topics)])
    }

    return (
        <div className="xl:w-[80%] lg:w-[85%] m-auto flex flex-col gap-4">

            {/* username of user and link to user progress page */}
            <ProfileHeader />
            {
                profileData && 
                (
                    <>
                    {/* summary of completed attempts */}
                    <ProfileTiles profileData={profileData} />
            
                    <div className='flex flex-col w-full'>
                        {/* sub header for post component */}
                        <div className='flex lg:flex-nowrap flex-wrap justify-between my-6 lg:px-0 px-6 lg:gap-0 gap-2 tracking-wide text-gray-500 lg:w-3/4'>
                            <h2 className=''>
                                Showing all posts for <span className='font-bold'>{username}</span>
                            </h2>

                            {/* search bar to search user's posts */}
                            <SearchBar handleChange={handleChange} />
                        </div>

                        {/* all posts components */}
                        <div className='flex lg:flex-row flex-col'>
                            {/* indivisual posts components */}
                            <PostComponent posts={profileData.posts} inputText={inputText} />

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