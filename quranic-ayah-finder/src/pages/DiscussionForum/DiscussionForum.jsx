import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { useContext } from 'react';
import { Context } from "../../Context";
import BackButton from '../../components/Buttons/BackButton'
import { BiSearchAlt2, BiCommentAdd } from 'react-icons/bi'
import TopicIcons from "../../components/Icons/TopicIcons";
import ForumPostComponent from "../../components/DiscussionForum/ForumPostComponent";
import SearchBar from "../../components/SearchBarSub/SearchBar";

export default function DiscussionForums() {
    const { loggedUser, setLoggedUSer } = useContext(Context); // get user if logged in
    const [posts, setPosts] = useState([]) // store data for all posts
    const [inputText, setInputText] = useState(""); // handle input in search bar

    // handle input of search bar for posts
    const handleChange = (e) => {
        setInputText(e.target.value.toLowerCase())
    }

    // fetch all posts data to be displayed
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts/', {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((json) =>{
                setPosts(json)
                console.log(json)
            })
            .catch(error => console.log(error))
    }, [])
    
    return (
        <div className="xl:w-[70%] lg:w-[85%] m-auto">
            {/* header section */}
            <div className="flex justify-between items-center">
                <h1 className="my-6 text-2xl font-bold">
                    Discussion Forums
                    
                </h1>
                {/* search bar for posts */}
                <SearchBar handleChange={handleChange} />
            </div>

            {/* create post button */}
            <div>
                {
                    loggedUser && <BackButton icon={<BiCommentAdd />} text={<Link to='/post/create'>Create Post</Link>} />
                }
                
            </div>
            
            {/* main section */}
            <div className="flex">
                {/* posts section */}
                <div className="w-3/4">
                    {!posts || posts.length <= 0 ? 
                    (
                        <div>No posts to show</div>
                    ) : 
                    (   // post component that shows all posts after filtering search results
                        <ForumPostComponent posts={posts} inputText={inputText} />
                    )}
                </div>

                {/* posts aside bar - show some guide topics */}
                <div className='w-1/4 tracking-wide text-gray-500 font-medium text-left mt-8'>
                    <h3 className='uppercase'>Explore Guides</h3>
                    <div className="flex flex-col">
                        {
                            ['Chapters of the Qur’an', 'Fruits in the Quran', 'Dealing with people in the Quran']
                            .map((topic,i) => (
                                <Link to={'/guides/topic/'+(i+1)}>
                                <div key={i} className='my-4 flex items-center gap-2'>
                                    <div className='bg-sea-green-opacity p-2 rounded-full text-[2rem]'><TopicIcons topic={topic} /> </div>
                                    {topic}
                                </div>
                                </Link>
                            ))
                            
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}