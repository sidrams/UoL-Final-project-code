import { useContext, useEffect, useState } from "react"
import { Context } from "../../Context"
import ProfileTiles from "../../components/Profile/ProfileTiles"
import Cookies from "js-cookie"
import PostComponent from "../../components/Posts/PostComponent"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import AttemptedTopicList from "../../components/ProfileScore/AttemptedTopicList"
import SearchBar from "../../components/SearchBarSub/SearchBar"
import { Link, useParams } from "react-router-dom"
// import ProfileSavedSearchesHeader from "../../components/ProfileSavedSearches/ProfileSavedSearchesHeader"
import BackButton from "../../components/Buttons/BackButton"
import SavedSearchesComponent from "../../components/ProfileSavedSearches/SavedSearchesComponent"

export default function ProfileSavedSearches() {
    // const { username } = useParams() // username of the user to view the profile 
    const { loggedUser, setLoggedUser } = useContext(Context) // get logged in user
    const csrftoken = Cookies.get('csrftoken');
    const [savedSearches, setSavedSearches] = useState() // profile data
    
    // handle search bar input
    const [inputText, setInputText] = useState('') 
    const handleChange = (e) => {
        setInputText(e.target.value.toLowerCase())
    }

    // get profile data
    useEffect(() => {
        // fetch profile data for the chosen user
        fetch('http://127.0.0.1:8000/saveSearch/', {
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
            setSavedSearches(json)
            console.log(json)
        })
        .catch(error => console.log(error))
    }, [])

    const getTopicsAttempted = () => {
        // gets topics user has saved from quizzes
        // let topics = []
        // profileData.progress.map((quiz,i) => {
        //     topics.push(quiz.quiz_topic_id.topic_name)
        // })
        // return([... new Set(topics)])
    }

    return (
        <div className="xl:w-[70%] lg:w-[85%] m-auto flex flex-col gap-4">

            {/* username of user and link to user progress page */}
            {/* <ProfileSavedSearchesHeader /> */}
            <h2 className="my-3 text-2xl font-semi text-left flex items-center">
                <Link to={'/profile/'+loggedUser.username}>
                    <BackButton />
                </Link>
                Your Saved Searches
            </h2>
            {
                savedSearches && 
                (
                    <>
                    {/* summary of completed attempts */}
                    {/* <ProfileTiles profileData={profileData} /> */}
            
                    <div className='flex flex-col w-full'>
                        {/* sub header for post component */}
                        <div className='flex justify-between my-3 tracking-wide text-gray-500 w-3/4'>
                            <h2 className=''>
                                Showing all {savedSearches.length} verses saved by <span className='font-bold'>{loggedUser.username}</span>
                            </h2>

                            {/* search bar to search user's posts */}
                            <SearchBar handleChange={handleChange} placeholder="Search saved verses..." />
                        </div>

                        {/* all saved searches components */}
                        <div className='flex'>
                            {/* indivisual posts components */}
                            <SavedSearchesComponent savedSearches={savedSearches} inputText={inputText} />

                            {/* List of topics that quizzes have been attempted for */}
                            {/* <AttemptedTopicList getTopicsAttempted={getTopicsAttempted} /> */}
                        </div>
                    </div>
                    </>
                )
            }
            
        </div>
    )
}