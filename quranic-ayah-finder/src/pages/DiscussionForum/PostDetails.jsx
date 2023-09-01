import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { BiSearchAlt2, BiSolidUserCircle } from "react-icons/bi";
import { Context } from "../../Context";
import TimeDifference from "../../components/Time/TimeDifference";
import { MdModeComment } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import BackButton from "../../components/Buttons/BackButton";
import { Menu } from "primereact/menu";

export default function PostDetails() {
    const { loggedUser, setLoggedUSer } = useContext(Context)
    const { id } = useParams()
    const csrftoken = Cookies.get('csrftoken');
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState()
    // const [commentSaved, setCommentSaved] = useState()
    const [featuredPosts, setFeaturedPosts] = useState()

    // const items = [
    //     {
    //         label:'',
    //         items: [
    //             {
    //                 label: 'Delete',
    //                 icon: 'pi pi-refresh',
    //                 command: () => {
    //                     // toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
    //                     setShowDelete(true)
    //                 }
    //             }
    //         ]
    //     }
    // ]
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts/'+id, {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((json) =>{
                setPost(json.post)
                setComments(json.comments)
                console.log(json)
            })
            .catch(error => console.log(error))
    }, [])

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

    // useEffect(() => {
    //     fetch('http://127.0.0.1:8000/api/comments/posts/'+id, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'X-CSRFToken': csrftoken,
    //         },
    //         credentials: 'include',
    //         })
    //         .then((response) => response.json())
    //         .then((json) =>{
    //             setComments(json.Comments)
    //             console.log(json.Comments)
    //         })
    //         .catch(error => console.log(error))
    // }, [])

    const postComment = (e) => {
        !loggedUser ? 
        alert('you need to be logged in to post a comment')
        :
        e.preventDefault()
        console.log("post the following comment: "+newComment)
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
            console.log("comment posted saved")
            console.log(json)
            // const updatedComments = comments.push(json)
            // console.log(updatedComments)
            setComments([...comments,json])
            // setCommentSaved(true)
            setNewComment('')
        })
        .catch(error => console.log(error))
    }
        // console.log(post)
        // console.log(comments)
     return(
     <div className="xl:w-[70%] lg:w-[85%] m-auto ">
     <BackButton onClick={() =>history.back()}  />
        <div className="pb-10 flex">
            

            {/* <div className="flex justify-between items-center px-4">
                <div className="my-6 flex flex-col items-start">
                    <p className="uppercase text-gray-400 tracking-wider font-medium text-sm">post</p>
                    {
                        post.post && 
                        (
                            <h1 className=" text-2xl font-bold">
                                {post.post.title}
                            </h1>
                        )
                    }
                    
                </div>
                <form method="GET" action="" className="w-[30%] flex items-center gap-1 mt-6">
                    <BiSearchAlt2 className="text-[1.5rem] text-sea-green" /><input type="text" className='w-full shadow' name="q" placeholder="Search posts..." onChange='' />
                </form>
            </div> */}

            <div className="w-[70%]">
                <div  className="mb-0 flex mt-4 tracking-wider bg-custom-gray xl:p-8 p-6 px-8 shadow-md  overflow-auto rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                    <div className="flex justify-between">
                    {/* <Link to={`/post/${post.pk}`}>
                        <h4 className="font-bold text-gray-600 xl:text-lg mb-2 hover:text-sea-green"> {post.post.title} </h4> 
                    </Link> */}
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
                            loggedUser && post.post && loggedUser.id == post.post.user.id && 
                            (
                                <div>
                                    {/* <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" /> */}
                                    <BackButton 
                                        icon={<SlOptionsVertical />} 
                                        customStyle="p-0 bg-transparent"
                                        customIconStyle="text-[1rem]"
                                        onClick={(e) => {setPost_id(e.target.value);menuRight.current.toggle(e)} } 
                                        aria-controls="popup_menu_right" aria-haspopup 
                                    />
                                </div>
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
        {/* {
            post && (
                <>
                <p>{id}</p>
                <p>{post.title}</p>
                <p>{post.description}</p>
                </>
            )
        } */}
                <div className="mb-4 flex tracking-wider bg-medium-gray xl:p-8 p-6 px-8 shadow-md rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                {
                    comments ? 
                    (
                        <>
                        {/* <h4>Comments</h4> */}
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

            <div className="w-[30%] pl-10">
                <h3 className='uppercase tracking-wide text-gray-500 font-medium text-left mt-6'>featured posts</h3>


                <div >
                    {/* <p>test</p> */}
                    {
                        featuredPosts && featuredPosts.map((post, i) => (
                            post.pk != id &&
                            <Link to={'/post/'+post.pk} onClick={() => setPost(post)} key={i} className="mb-0 flex mt-4 tracking-wider bg-custom-gray xl:p-8 p-6  shadow-md  overflow-auto rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                                 {
                                    post.user && (
                                        <p className="text-xs font-medium text-sea-green hover:font-medium  flex items-center gap-1">
                                            @{post.user.username} <span className="text-mid-gray font-thin "> posted</span>
                                        </p>
                                    )
                                }
                                <p className="mb-2 truncate">{post.title.length < 35 ? post.title : post.title.slice(0,35)}</p>


                                <div className="flex gap-4 lg:text-xs font-thin">
                                   
                                    <p>{post && TimeDifference(post.updated)} ago</p>
                                    <Link to={``} className="text-gray-500 underline flex items-center gap-1"><MdModeComment />
                                        {comments.length} {comments.length != 1 ? 'comments' : 'comment'}
                                    </Link>
                                </div>
                            </Link>
                            
                        ))
                    }
                </div>
            </div>
        </div>
        </div>
    )
}