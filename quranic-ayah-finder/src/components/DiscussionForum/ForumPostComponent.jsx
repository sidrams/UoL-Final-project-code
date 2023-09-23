import { Link } from "react-router-dom";
import ForumPostToggleMenu from "./ForumPostToggleMenu";
import { useContext, useState } from "react";
import { Context } from "../../Context";
import { Paginator } from 'primereact/paginator';
import DeleteConfirmation from "../../pages/DiscussionForum/DeleteConfirmation"
import ForumSubComponent from "./ForumSubComponent";

export default function ForumPostComponent({posts, inputText}) {
    const { loggedUser, setLoggedUSer } = useContext(Context); // get user if logged in
    const [showDelete, setShowDelete] = useState(false) // show delete confirmation modal if prompted
    const [post_id, setPost_id] = useState() // set post to be viewed/edited

    // pagination controls
    const [first, setFirst] = useState(0); // index of first post to be displayed
    const [rows, setRows] = useState(5); // index of last post to be displayed
    // handle change in pagination
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <>
        {   // implement search filter
            posts.filter(post => {
                if (inputText === '') {
                return post;
                } else if (
                    // compare with post title, description/body, username, verse_id...
                    post.title.toLowerCase().includes(inputText) ||
                    post.description.toLowerCase().includes(inputText) ||
                    post.user.username.toLowerCase().includes(inputText) ||
                    toString(post.verse_id).toLowerCase().includes(inputText)
                ) {
                return post;
                }
            })
            .slice(first, first + rows)
            .map((post,i) => (
                // render post components
                <div key={i} className="mb-4 flex my-10 lg:mx-0 mx-auto w-[90%] text-slate-400  tracking-wider bg-custom-gray xl:p-8 p-6 shadow-md w-[70%] overflow-auto rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                    <div className="flex justify-between">
                        {/* post title */}
                        <Link to={`/post/${post.pk}`}>
                            <h4 className="font-bold text-gray-600 xl:text-lg mb-2 hover:text-sea-green"> {post.title} </h4> 
                        </Link>

                        {   // toggle menu with options to update or delete posts
                            loggedUser && post.user && loggedUser.id == post.user.id && 
                            <ForumPostToggleMenu setPost_id={setPost_id} setShowDelete={setShowDelete} post={post} />
                        }
                    </div>
            
                    {/* display username, time posted ago and number of comments */}
                    <ForumSubComponent post={post} />
                </div>
            
        ))}
        {/* paginator for displayed posts */}
        <Paginator first={first} rows={rows} totalRecords={posts.length} rowsPerPageOptions={[5, 10, 20]} onPageChange={onPageChange} />

        {/* delete confirmation modal displayed when user prompts to delete post */}
        {showDelete && 
            <DeleteConfirmation 
                setShowDelete={setShowDelete} 
                post_id={post_id}
            />
        }
        </>
    )
}