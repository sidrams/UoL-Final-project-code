import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DeleteConfirmation from "./DeleteConfirmation"
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { Context } from "../../Context";

export default function DiscussionForums() {
    const { loggedUser, setLoggedUSer } = useContext(Context);
    const [posts, setPosts] = useState([])
    const [showDelete, setShowDelete] = useState(false)
    const [post_id, setPost_id] = useState()
    const [inputText, setInputText] = useState("");

    // const session = Cookies.get('sessionid');
    const csrftoken = Cookies.get('csrftoken');
    // console.log("cookies token "+csrftoken)
    console.log('logged user '+JSON.stringify(loggedUser.id))

    // const handleDelete = (post_id)
    const handleChange = (e) => {
        setInputText(e.target.value.toLowerCase())
    }

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
        <>
        <h1>DiscussionForums</h1>
        <form method="GET" action="">
            <input type="text" name="q" placeholder="search posts..." onChange={handleChange} />
        </form>
        {
            loggedUser ? <Link to='/post/create'>Create Post</Link> : ''
        }
        <div>
        {!posts || posts.length <= 0 ? (
                <div></div>
            ) : (
                <>
                { 
                    posts.filter(post => {
                        if (inputText === '') {
                          return post;
                        } else if (
                            post.title.toLowerCase().includes(inputText) ||
                            post.description.toLowerCase().includes(inputText) ||
                            post.user.username.toLowerCase().includes(inputText) ||
                            toString(post.verse_id).toLowerCase().includes(inputText)
                        ) {
                          return post;
                        }
                      })
                    .map((post,i) => (
                    
                    <div key={i} className="mb-4">
                        <Link to={`/post/${post.pk}`}>
                            {
                                post.user ? (
                                    <p>@{post.user.username}</p>
                                ): (<p></p>)
                            }
                            
                            <h2> {post.title} </h2> 
                            <p> {post.description < 100 ? post.description : post.description.slice(0, 300)} </p>
                            <p>... Read more</p>
                        </Link>
                        {
                            loggedUser.id == post.user.id ? 
                            (
                                <div>
                                <Link to={`/post/update/${post.pk}`}>Edit post</Link>
                                <button value={post.pk} onClick={(e) => {
                                    setPost_id(e.target.value)
                                    setShowDelete(true)
                                    // console.log()
                                }}>Delete post</button>
                                </div>
                            ) 
                            : ''
                            // console.log(post.user)
                        }
                        
                        {/* <Link to={`/post/delete/${post.pk}`}>Delete post</Link> */}
                        
                          
                    </div>
                    
                ))}

              {showDelete ? (
                            <>
                            <DeleteConfirmation 
                                setShowDelete={setShowDelete} 
                                post_id={post_id}
                                // searchedText={searchedText} 
                                // setSearchedText={setSearchedText} 
                            />
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                        ) : null}
                {/* <div>{JSON.stringify(postDetails.search.results)}</div> */}
                
                </>
           )}
        </div>
        </>
    )
}