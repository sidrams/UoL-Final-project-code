import { Link } from "react-router-dom";
import TimeDifference from "../Time/TimeDifference";
import { MdModeComment } from "react-icons/md";
import { BiSolidUserCircle } from "react-icons/bi";

export default function PostComponentSubSection({post, comments}) {
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

            {/* time posted */}
            <p>{post && TimeDifference(post.updated)} ago</p>

            {/* number of comments */}
            <Link to={``} className="text-gray-500 underline flex items-center gap-1">
                <MdModeComment />
                {comments.length} {comments.length != 1 ? 'comments' : 'comment'}
            </Link>
        </div>
    )
}