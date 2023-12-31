import { Link } from "react-router-dom";
import TimeDifference from "../Time/TimeDifference";
import { MdModeComment } from "react-icons/md";

export default function FeaturedPostsSideBar({featuredPosts, setPost, id, comments}) {
    // recent posts displayed on the side
    return (
        <div >
            {
                featuredPosts && featuredPosts.map((post, i) => (
                    // show post iif not the same as current one
                    post.pk != id &&
                    <Link to={'/post/'+post.pk} onClick={() => setPost(post)} key={i} className="mb-0 flex mt-4 tracking-wider bg-custom-gray xl:p-8 p-6  shadow-md  overflow-auto rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                            {   // user who posted
                                post.user && (
                                <p className="text-xs font-medium text-sea-green hover:font-medium  flex items-center gap-1">
                                    @{post.user.username} <span className="text-mid-gray font-thin "> posted</span>
                                </p>
                            )
                        }
                        {/* some content of the post */}
                        <p className="mb-2 truncate">{post.title.length < 35 ? post.title : post.title.slice(0,35)}</p>


                        <div className="flex gap-4 lg:text-xs font-thin">
                            {/* time posted ago */}
                            <p>{post && TimeDifference(post.updated)} ago</p>

                            {/* number of comments */}
                            <Link to={``} className="text-gray-500 underline flex items-center gap-1">
                                <MdModeComment />
                                {comments.length} {comments.length != 1 ? 'comments' : 'comment'}
                            </Link>
                        </div>
                    </Link>
                    
                ))
            }
        </div>
    )
}