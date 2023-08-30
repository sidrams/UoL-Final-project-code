import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import DeleteConfirmation from "./DeleteConfirmation"
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { Context } from "../../Context";
import BackButton from '../../components/Buttons/BackButton'
import { BiCommentAdd } from "react-icons/bi";
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { SlOptionsVertical } from 'react-icons/sl'

export default function DiscussionForums() {
    const { loggedUser, setLoggedUSer } = useContext(Context);
    const [posts, setPosts] = useState([])
    const [showDelete, setShowDelete] = useState(false)
    const [post_id, setPost_id] = useState()
    // const [postUser, setPostUser] = useState()
    const [inputText, setInputText] = useState("");

    const menuRight = useRef(null);
    const toast = useRef(null);
    const items = [
        {
            label:'',
            items: [
                {
                    label: 'Delete',
                    icon: 'pi pi-refresh',
                    command: () => {
                        // toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                        setShowDelete(true)
                    }
                }
            ]
        }
    ]
    // const session = Cookies.get('sessionid');
    const csrftoken = Cookies.get('csrftoken');
    // console.log("cookies token "+csrftoken)
    // console.log('logged user '+JSON.stringify(loggedUser.id))

    // const handleDelete = (post_id)
    const handleChange = (e) => {
        setInputText(e.target.value.toLowerCase())
    }

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
        <div className="xl:w-[70%] lg:w-[85%] m-auto">
            <div className="flex justify-between items-center">
                <h1 className="my-6 text-2xl font-bold">
                    Discussion Forums
                </h1>
                <form method="GET" action="" className="w-[30%]">
                    <input type="text" className='w-full' name="q" placeholder="Search posts..." onChange={handleChange} />
                </form>
            </div>

            {/* create post button */}
            <div>
                <BackButton icon={<BiCommentAdd />} text={
                    loggedUser ? <Link to='/post/create'>Create Post</Link> : ''
                } />
                
            </div>
            
            <div className="flex">
                {/* display all posts */}
                <div className="w-3/4">
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
                                    post.description.toLowerCase().includes(inputText) ||
                                    post.user.username.toLowerCase().includes(inputText) ||
                                    toString(post.verse_id).toLowerCase().includes(inputText)
                                ) {
                                return post;
                                }
                            })
                            .map((post,i) => (
                            // render post components
                            <div key={i} className="mb-4 flex my-10 w-[90%] text-slate-400  tracking-wider bg-custom-gray xl:p-8 p-6 shadow-md w-[70%] overflow-auto rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                            <div className="flex justify-between">
                                <Link to={`/post/${post.pk}`}>
                                    <h4 className="font-bold text-gray-600 xl:text-lg mb-2 hover:text-sea-green"> {post.title} </h4> 
                                </Link>

                                {
                                    loggedUser.id == post.user.id && 
                                    (
                                        <div>
                                        <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
                                        
                                            {/* <button value={post.pk} onClick={(e) => {setPost_id(e.target.value);menuRight.current.toggle(e)}} aria-controls="popup_menu_right" aria-haspopup > */}
                                                {/* delete icon */}
                                                {/* <SlOptionsVertical 
                                                    onClick={()=>setShowDelete(true)} 
                                                    aria-controls="popup_menu_right" aria-haspopup 
                                        
                                                /> */}
                                                <BackButton 
                                                    icon={<SlOptionsVertical />} 
                                                    customStyle="p-0 bg-transparent"
                                                    customIconStyle="text-[1rem]"
                                                    onClick={(e) => {setPost_id(e.target.value);menuRight.current.toggle(e)} } 
                                                    aria-controls="popup_menu_right" aria-haspopup 
                                                />
                                            {/* </button> */}
                                        </div>
                                    ) 
                                }

                                
                            </div>
                            

                            <div className="flex gap-4 lg:text-sm">
                                {
                                    post.user && (
                                        <Link to='/profile' className="text-gray-500 underline">@{post.user.username}</Link>
                                    )
                                }
                                <p>43 minutes ago</p>
                                <Link to={`/post/${post.pk}`} className="text-gray-500 underline">5 comments</Link>
                                {/* <Toast ref={toast}></Toast> */}

                                
                                {
                                    loggedUser.id == post.user.id && 
                                    (
                                        <>
                                        <div>
                                            <Link to={`/post/update/${post.pk}`} className="text-gray-500 underline">Edit</Link>
                                        </div>
                                        {/* <div>
                                        <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
                                            <button value={post.pk} onClick={(e) => {setPost_id(e.target.value);menuRight.current.toggle(e)}} aria-controls="popup_menu_right" aria-haspopup >delete icon</button>
                                        </div> */}
                                        </>
                                    ) 
                                    // : ''
                                    // console.log(post.user)
                                }
                            </div>
                                    {/* <p> {post.description < 300 ? post.description : post.description.slice(0, 300)} </p>
                                    <p>... Read more</p> */}
                                
                                {/* {
                                    loggedUser.id == post.user.id && 
                                    (
                                        <div>
                                        <Link to={`/post/update/${post.pk}`}>Edit post</Link>
                                        <button value={post.pk} onClick={(e) => {
                                            setPost_id(e.target.value)
                                            setShowDelete(true)
                                            // setPostUser(post.user)
                                            // console.log()
                                        }}>Delete post</button>
                                        </div>
                                    ) 
                                    // : ''
                                    // console.log(post.user)
                                } */}
                                
                                {/* <Link to={`/post/delete/${post.pk}`}>Delete post</Link> */}
                                
                                
                            </div>
                            
                        ))}

                    {showDelete ? (
                                    <>
                                    <DeleteConfirmation 
                                        setShowDelete={setShowDelete} 
                                        post_id={post_id}
                                        // postUser={postUser}
                                        // searchedText={searchedText} 
                                        // setSearchedText={setSearchedText} 
                                    />
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                ) : null}
                        {/* <div>{JSON.stringify(postDetails.search.results)}</div> */}
                        
                        </>
                    )}
                </div>

                {/* posts aside bar - show some guide topics */}
                <div className='w-1/4 tracking-wide text-gray-500 font-medium  text-left px-10 mt-8'>
                    <h3 className='uppercase'>Explore Guides</h3>
                    <div>
                        {/* {
                            getTopicsAttempted().map((topic,i) => (
                                <div key={i} className='my-4 flex items-center gap-2'>
                                    <div className='bg-sea-green-opacity p-2 rounded-full text-[2rem]'><TopicIcons topic={topic} /> </div>
                                    {topic}
                                </div>
                            ))
                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}