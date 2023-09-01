import Cookies from "js-cookie";
import TimeDifference from "../Time/TimeDifference";
import { useContext, useState } from "react";
import { Context } from "../../Context";

export default function CommentsComponent({id, comments, setComments}) {
    const { loggedUser, setLoggedUSer } = useContext(Context) // check if user is logged in
    const csrftoken = Cookies.get('csrftoken'); // for making requests to API
    const [newComment, setNewComment] = useState() // new comment stored here

    // request to post a comment to a post
    const postComment = (e) => {
        // only logged in users can post
        !loggedUser ? 
        alert('You need to be Logged in to post a comment')
        :
        e.preventDefault()

        // make request
        fetch(`http://127.0.0.1:8000/api/add/comments/posts/`+id, {
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
            setComments([...comments,json])
            setNewComment('')
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="mb-4 flex tracking-wider bg-medium-gray xl:p-8 p-6 px-8 shadow-md rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
        {
            comments &&
                <>
                {comments.map((comment, i) => (
                    <div className="my-4 flex flex-col">
                        {/* username of user and time posted of comment */}
                        <p className="font-medium my-1">
                            @{comment.user.username} 
                            <span className="text-xs ml-2 text-mid-gray">{TimeDifference(comment.updated)} ago</span>
                        </p>  
                        {/* comment content */}
                        <p className="flex post-comment ml-2">{comment.body}</p>
                    </div>
                ))}

                {/* comment input section */}
                <form action="" className="mt-6 flex">
                    <input type="text" className="w-[90%]" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a new comment here"/>
                    <button onClick={postComment} className="uppercase tracking-wider">Post</button>
                </form>
                </>
        }
        </div>
    )
}