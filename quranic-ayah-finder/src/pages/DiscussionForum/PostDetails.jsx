import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { BiSearchAlt2 } from "react-icons/bi";
export default function PostDetails() {
    const { id } = useParams()
    const csrftoken = Cookies.get('csrftoken');
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState()
    const [commentSaved, setCommentSaved] = useState()
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts/'+id, {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((json) =>{
                setPost(json)
                console.log(json)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/comments/posts/'+id, {
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
                setComments(json.Comments)
                console.log(json.Comments)
            })
            .catch(error => console.log(error))
    }, [])

    const postComment = (e) => {
        e.preventDefault()
        console.log("post the following comment: "+newComment)
        fetch(`http://127.0.0.1:8000/api/comments/posts/`+id, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            body: JSON.stringify({"body":newComment})
        })
        .then((response) => response.json())
        .then((json) =>{
            console.log("comment posted saved")
            console.log(json)
            // const updatedComments = comments.push(json)
            // console.log(updatedComments)
            setComments([...comments,json])
            setCommentSaved(true)
            setNewComment('')
        })
        .catch(error => console.log(error))
    }
        console.log(post)
        console.log(comments)
     return(
        <div className="xl:w-[70%] lg:w-[85%] m-auto">
            <div className="flex justify-between items-center">
                <div className="my-6 flex flex-col items-start">
                    <p className="uppercase text-gray-400 tracking-wider font-medium text-sm">post</p>
                    <h1 className=" text-2xl font-bold">
                        {post.post.title}
                        
                    </h1>
                </div>
                <form method="GET" action="" className="w-[30%] flex items-center gap-1 mt-6">
                    <BiSearchAlt2 className="text-[1.5rem] text-sea-green" /><input type="text" className='w-full shadow' name="q" placeholder="Search posts..." onChange='' />
                </form>
            </div>
        {
            post && (
                <>
                <p>{id}</p>
                <p>{post.title}</p>
                <p>{post.description}</p>
                </>
            )
        }
        
        {
            comments ? 
            (
                <>
                <h4>Comments</h4>
                {comments.map((comment, i) => (
                    <p><em>@{comment.user.username}</em>  {comment.body}</p>
                ))}
                <form action="">
                    <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a new comment here"/>
                    <button onClick={postComment} >Post</button>
                </form>
                </>
            ) : ''
        }
        </div>
    )
}