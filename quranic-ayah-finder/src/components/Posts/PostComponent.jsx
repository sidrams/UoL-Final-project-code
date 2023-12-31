import { Link } from "react-router-dom";
import TimeDifference from "../Time/TimeDifference";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdModeComment } from "react-icons/md";
import { useContext, useState } from "react";
import { Context } from "../../Context";
import ForumPostToggleMenu from "../DiscussionForum/ForumPostToggleMenu";

export default function PostComponent({posts, inputText}) {
    const { loggedUser, setLoggedUser } = useContext(Context)
    const [showDelete, setShowDelete] = useState(false) // show delete confirmation modal if prompted
    const [post_id, setPost_id] = useState() // set post to be viewed/edited
    
    return (
        // post component
        <div className="lg:w-3/4 w-[95%] lg:mx-0 mx-auto lg:mt-8">
        {!posts || posts.length <= 0 ? 
        (
            <div>No posts to show</div>
        ) : 
        (
            <>
            {   // implement search filter
                posts.filter(post => {
                    if (inputText === '') {
                    return post;
                    } else if (
                        post.title.toLowerCase().includes(inputText) ||
                        (post.description && post.description.toLowerCase().includes(inputText)) ||
                        post.user.username.toLowerCase().includes(inputText) ||
                        toString(post.verse_id).toLowerCase().includes(inputText)
                    ) {
                    return post;
                    }
                })
                .map((post,i) => (
                // render post components
                <div key={i} className="mb-4 flex  w-full text-slate-400  tracking-wider bg-custom-gray xl:p-8 p-6 shadow-md w-[70%] overflow-auto rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                    <div className="flex justify-between">
                        <Link to={`/post/${post.pk}`}>
                            <h4 className="font-bold text-gray-600 xl:text-lg mb-2 hover:text-sea-green"> {post.title} </h4> 
                        </Link>

                        {   // toggle menu with delete option for owners of post
                            (loggedUser && loggedUser.id == post.user.id) && 
                            (
                                <ForumPostToggleMenu setPost_id={setPost_id} setShowDelete={setShowDelete} post={post} />
                            ) 
                        }
                    </div>

                    <div className="flex gap-4 lg:text-sm">
                        {   // username
                            post.user && (
                                <Link to={'/profile/'+post.user.username} className="text-sea-green hover:font-medium underline flex items-center gap-1">
                                    <BiSolidUserCircle />
                                    @{post.user.username}
                                </Link>
                            )
                        }

                        {/* time posted ago */}
                        <p>{TimeDifference(post.updated)} ago</p>

                        {/* number of comments */}
                        <Link to={`/post/${post.pk}`} className="text-gray-500 underline flex items-center gap-1">
                            <MdModeComment />
                            {post.comment_count} {post.comment_count != 1 ? 'comments' : 'comment'}
                        </Link>
                        
                        {   // edit option ofor owners of post
                            (loggedUser && loggedUser.id == post.user.id) && 
                            (
                                <div>
                                    <Link to={`/post/update/${post.pk}`} className="text-gray-500 underline">Edit</Link>
                                </div>
                            ) 
                        }
                    </div>
                </div>
                
            ))}
            </>
        )}
    </div>
    )
}