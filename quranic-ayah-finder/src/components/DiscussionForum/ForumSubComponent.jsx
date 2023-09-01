import { BiSolidUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import TimeDifference from "../Time/TimeDifference";
import { MdModeComment } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../Context";

export default function ForumSubComponent({post}) {
    const { loggedUser, setLoggedUSer } = useContext(Context); // get user if logged in

    return (
        <div className="flex gap-4 lg:text-sm">
            {   // username
                post.user && (
                    <Link to='/profile' className="text-sea-green hover:font-medium underline flex items-center gap-1">
                        <BiSolidUserCircle />
                        @{post.user.username}
                    </Link>
                )
            }
            
            {/* time posted at */}
            <p>{TimeDifference(post.updated)} ago</p>
            
            {/* number of comments */}
            <Link to={`/post/${post.pk}`} className="text-gray-500 underline flex items-center gap-1">
                <MdModeComment />
                {post.comment_count} {post.comment_count != 1 ? 'comments' : 'comment'}
            </Link>
            
            {/* if post belongs to logged in user - allow to edit post */}
            {
                loggedUser && post.user && loggedUser.id == post.user.id && 
                (
                    <>
                    <div>
                        <Link to={`/post/update/${post.pk}`} className="text-gray-500 underline">Edit</Link>
                    </div>
                    </>
                ) 
            }
        </div>
    )
}