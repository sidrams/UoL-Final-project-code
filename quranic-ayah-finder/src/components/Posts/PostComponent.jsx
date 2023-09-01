import { Link } from "react-router-dom";
import BackButton from "../Buttons/BackButton";
import { SlOptionsVertical } from "react-icons/sl";
import TimeDifference from "../Time/TimeDifference";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdModeComment } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../Context";

export default function PostComponent({posts, inputText}) {
    const { loggedUser, setLoggedUser } = useContext(Context)
    
    
    return (
        // <p>post component</p>
        <div className="w-3/4 mt-8">
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
                // .slice(first, first + rows)
                .map((post,i) => (
                // render post components
                <div key={i} className="mb-4 flex  w-full text-slate-400  tracking-wider bg-custom-gray xl:p-8 p-6 shadow-md w-[70%] overflow-auto rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                <div className="flex justify-between">
                    <Link to={`/post/${post.pk}`}>
                        <h4 className="font-bold text-gray-600 xl:text-lg mb-2 hover:text-sea-green"> {post.title} </h4> 
                    </Link>

                    {
                        loggedUser && loggedUser.id == post.user.id && 
                        (
                            <div>
                            {/* <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" /> */}
                            
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
                            <Link to='/profile' className="text-sea-green hover:font-medium underline flex items-center gap-1"><BiSolidUserCircle />@{post.user.username}</Link>
                        )
                    }
                    <p>{TimeDifference(post.updated)} ago</p>
                    <Link to={`/post/${post.pk}`} className="text-gray-500 underline flex items-center gap-1"><MdModeComment />{post.comment_count} {post.comment_count != 1 ? 'comments' : 'comment'}</Link>
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
            {/* <Paginator first={first} rows={rows} totalRecords={posts.length} rowsPerPageOptions={[5, 10, 20]} onPageChange={onPageChange} /> */}


        {/* {showDelete ? (
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
                    ) : null} */}
            {/* <div>{JSON.stringify(postDetails.search.results)}</div> */}
            
            </>
        )}
    </div>
    )
}