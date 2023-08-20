import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function DiscussionForums() {
    const [posts, setPosts] = useState([])

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
        <Link to='/create-post'>Create Post</Link>
        <div>
        {!posts || posts.length <= 0 ? (
                <div></div>
            ) : (
                <>
                { 
                    posts.map((post,i) => (
                    <Link to={`/posts/${post.pk}`}>
                    <div key={i} className="mb-4">
                        {
                            post.user ? (
                                <p>@{post.user.username}</p>
                            ): (<p></p>)
                        }
                        
                        <h2> {post.title} </h2> 
                        <p> {post.description < 100 ? post.description : post.description.slice(0, 300)} </p>
                        <p>... Read more</p>
                    </div>
                    </Link>
                ))}
                
                {/* <div>{JSON.stringify(postDetails.search.results)}</div> */}
                
                </>
           )}
        </div>
        </>
    )
}