import { useState, useEffect, useContext, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { BiSearchAlt2, BiSolidUserCircle } from "react-icons/bi";
import { Context } from "../../Context";
import TimeDifference from "../../components/Time/TimeDifference";
import { MdModeComment } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import BackButton from "../../components/Buttons/BackButton";
import { Menu } from "primereact/menu";
import FeaturedPostsSideBar from "../../components/Posts/FeaturedPostsSideBar";
import DeleteConfirmation from "./DeleteConfirmation";

export default function PostDetails() {
    const { loggedUser, setLoggedUSer } = useContext(Context)
    const { id } = useParams()
    const csrftoken = Cookies.get('csrftoken');
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState()
    const [featuredPosts, setFeaturedPosts] = useState()
    const [showDelete, setShowDelete] = useState(false)
    
    const navigate = useNavigate()
    const [post_id, setPost_id] = useState()
    const menuRight = useRef(null);
    const items = [
        {
            label:'',
            items: [
                {
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    command: () => {
                        navigate("/post/update/"+post_id)
                        // console.log(post_id)
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-refresh',
                    command: () => {
                        // toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                        setShowDelete(true)
                    }
                },
                
            ]
        }
    ]

    // get post and comments data for the chosen post
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts/'+id, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((json) =>{
            setPost(json.post)
            console.log(json.post)
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
            console.log(json.slice(0,3))
        })
        .catch(error => console.log(error))
    }, [])

    // request to post a comment to a post
    const postComment = (e) => {
        // only logged in users can post
        !loggedUser ? 
        alert('you need to be logged in to post a comment')
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
     return(
     <div className="xl:w-[70%] lg:w-[85%] m-auto ">
        <Link to='/discussionForums'><BackButton onClick=''  /></Link>
        <div className="pb-10 flex">
            <div className="w-[70%]">
                <div  className="mb-0 flex mt-4 tracking-wider bg-custom-gray xl:p-8 p-6 px-8 shadow-md  overflow-auto rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                    <div className="flex justify-between">

                        <div className="mb-6 flex flex-col items-start">
                            <p className="uppercase text-gray-400 tracking-wider font-medium text-sm">post</p>
                            {
                                post && 
                                (
                                    <>
                                    <h1 className=" text-2xl font-bold">
                                        {post.title}
                                    </h1>
                                    <p className="my-4 text-mid-gray">
                                        {post.description}
                                    </p>
                                    </>
                                )
                            }
                            
                        </div>

                        {
                            loggedUser && post.user && loggedUser.id == post.user.id && 
                            (
                                <div>
                                    <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
                                    <BackButton 
                                        icon={<SlOptionsVertical />} 
                                        customStyle="p-0 bg-transparent"
                                        customIconStyle="text-[1rem]"
                                        onClick={(e) => {setPost_id(post.pk);menuRight.current.toggle(e)} } 
                                        aria-controls="popup_menu_right" aria-haspopup 
                                    />
                                </div>
                            ) 
                        }

                        {
                            showDelete && 
                            (
                                <DeleteConfirmation setShowDelete={setShowDelete} post_id={post.pk} />
                            )
                        }
                    </div>
                    

                    <div className="flex gap-4 lg:text-sm">
                        {
                            post.user && (
                                <Link to='/profile' className="text-sea-green hover:font-medium underline flex items-center gap-1"><BiSolidUserCircle />@{post.user.username}</Link>
                            )
                        }
                        <p>{post.post && TimeDifference(post.post.updated)} ago</p>
                        <Link to={``} className="text-gray-500 underline flex items-center gap-1"><MdModeComment />{comments.length} {comments.length != 1 ? 'comments' : 'comment'}</Link>
                    </div>
                </div>

                <div className="mb-4 flex tracking-wider bg-medium-gray xl:p-8 p-6 px-8 shadow-md rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                {
                    comments ? 
                    (
                        <>
                        {comments.map((comment, i) => (
                            <div className="my-4 flex flex-col">
                                <p className="font-medium my-1">
                                    @{comment.user.username} 
                                    <span className="text-xs ml-2 text-mid-gray">{TimeDifference(comment.updated)} ago</span>
                                </p>  
                                <p className="flex post-comment ml-2">{comment.body}</p>
                            </div>
                        ))}
                        <form action="" className="mt-6 flex">
                            <input type="text" className="w-[90%]" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a new comment here"/>
                            <button onClick={postComment} className="uppercase tracking-wider">Post</button>
                        </form>
                        </>
                    ) : ''
                }
                </div>
            </div>

            {/* featured posts section on the side */}
            <div className="w-[30%] pl-10">
                <h3 className='uppercase tracking-wide text-gray-500 font-medium text-left mt-6'>featured posts</h3>

                <FeaturedPostsSideBar featuredPosts={featuredPosts} setPost={setPost} id={id} comments={comments} />
            </div>
        </div>
        </div>
    )
}