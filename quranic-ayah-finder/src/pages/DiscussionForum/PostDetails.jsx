import { useState, useEffect, useContext, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { Context } from "../../Context";
import BackButton from "../../components/Buttons/BackButton";
import FeaturedPostsSideBar from "../../components/Posts/FeaturedPostsSideBar";
import DeleteConfirmation from "./DeleteConfirmation";
import CommentsComponent from "../../components/Posts/CommentsComponent";
import LoginModalComponent from "../../components/Login/LoginModalComponent";
import ToggleMenuComponent from "../../components/Posts/ToggleMenuComponent";
import PostComponentSubSection from "../../components/Posts/PostComponentSubSection";
import PostComponentBody from "../../components/Posts/PostComponentBody";

export default function PostDetails() {
    const { loggedUser, setLoggedUSer } = useContext(Context) // get user if logged in
    const { id } = useParams() // post id of the chosen post
    const [post, setPost] = useState([]) // store post data 
    const [comments, setComments] = useState([]) // store comments for the post
    const [featuredPosts, setFeaturedPosts] = useState() // get posts for featured side section
    const [showDelete, setShowDelete] = useState(false) // show delete confirmation modal if prompted
    const [showLogin, setShowLogin] = useState(false) // show login component if anonymous user wants to post a comment

    // get post and comments data for the chosen post
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts/'+id, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((json) =>{
            setPost(json.post)
            setComments(json.comments)
        })
        .catch(error => console.log(error))
    }, [])

    // get featured posts to show on the side 
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((json) =>{
            setFeaturedPosts(json.slice(0,3))
        })
        .catch(error => console.log(error))
    }, [])

    return(
     <div className="xl:w-[80%] lg:w-[85%] m-auto ">
        {   // show login component if user wants to post comment and is not logged in
            showLogin && <LoginModalComponent setShowLogin={setShowLogin} />
        }
        
        {/* back button */}
        <Link to='/discussionForums'><BackButton onClick=''  /></Link>
        
        {/* post section */}
        <div className="pb-10 flex lg:flex-row flex-col">
            <div className="lg:w-[70%] w-[95%] lg:mx-0 mx-auto">
                {/* post component */}
                <div  className="mb-0 flex mt-4 tracking-wider bg-custom-gray xl:p-8 p-6 px-8 shadow-md  overflow-auto rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                    <div className="flex justify-between">
                        {/* post body - containing title and description */}
                        <PostComponentBody post={post} />

                        {/* toggle menu with options to update or delete posts */}
                        {
                            loggedUser && post.user && loggedUser.id == post.user.id && 
                            (
                                <ToggleMenuComponent post={post} setShowDelete={setShowDelete} />
                            ) 
                        }

                        {/* if post is promted to be deleted */}
                        {
                            showDelete && 
                            (
                                <DeleteConfirmation setShowDelete={setShowDelete} post_id={post.pk} />
                            )
                        }
                    </div>
                    
                    {/* post component subsection containg username, time posted, no of comments */}
                    <PostComponentSubSection post={post} comments={comments} />
                </div>

                {/* comments section */}
                <CommentsComponent id={id} comments={comments} setComments={setComments} setShowLogin={setShowLogin} />
            </div>

            {/* featured posts section on the side */}
            <div className="lg:w-[30%] lg:pl-10 w-[95%] lg:mx-0 mx-auto">
                <h3 className='uppercase tracking-wide text-gray-500 font-medium text-left mt-6'>featured posts</h3>

                <FeaturedPostsSideBar featuredPosts={featuredPosts} setPost={setPost} id={id} comments={comments} />
            </div>
        </div>
        </div>
    )
}