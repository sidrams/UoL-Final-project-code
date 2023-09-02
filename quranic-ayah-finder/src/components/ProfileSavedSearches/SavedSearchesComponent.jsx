import { Link } from "react-router-dom";
import BackButton from "../Buttons/BackButton";
import { SlOptionsVertical } from "react-icons/sl";
import TimeDifference from "../Time/TimeDifference";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdModeComment } from "react-icons/md";
import { useContext, useState } from "react";
import { Context } from "../../Context";
import SavedSearchToggleMenu from "./SavedSearchToggleMenu";

export default function SavedSearchesComponent({savedSearches, inputText}) {
    const { loggedUser, setLoggedUser } = useContext(Context)
    const [showDelete, setShowDelete] = useState(false) // show delete confirmation modal if prompted
    const [post_id, setPost_id] = useState() // set post to be viewed/edited

    console.log(savedSearches)
    return (
        // search component
        <div className="w-3/4 mt-8">
        {!savedSearches || savedSearches.length <= 0 ? 
        (
            <div>No savedSearches to show</div>
        ) : 
        (
            <>
            {   // implement search filter
                savedSearches
                .filter(search => {
                    if (inputText === '') {
                    return search;
                } 
                else if (
                        search.user_notes.toLowerCase().includes(inputText) ||
                        search.translation && search.translation.toLowerCase().includes(inputText) ||
                        search.verse_key.toLowerCase().includes(inputText)
                    ) {
                    return search;
                    }
                })
                .map((search,i) => (
                // render search components
                <div key={i} className="mb-4 flex  w-full text-slate-400  tracking-wider bg-custom-gray xl:p-8 p-6 shadow-md w-[70%] overflow-auto rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                    <div className="flex justify-between">
                        <Link to={`/search/${search.pk}`}>
                            <h4> Verse {search.verse_key} </h4> 
                            <h3 className="font-bold text-gray-600 text-lg mb-2 hover:text-sea-green" dangerouslySetInnerHTML={{__html: search.translation }}></h3>
                        </Link>

                        {   // toggle menu with delete option for owners of search
                            loggedUser && loggedUser.id == search.user.id && 
                            (
                                // <BackButton 
                                //     icon={<SlOptionsVertical />} 
                                //     customStyle="p-0 bg-transparent"
                                //     customIconStyle="text-[1rem]"
                                //     onClick={(e) => {setPost_id(e.target.value);menuRight.current.toggle(e)} } 
                                //     aria-controls="popup_menu_right" aria-haspopup 
                                // />
                                <SavedSearchToggleMenu search={search} setShowDelete={setShowDelete} />
                            ) 
                        }
                    </div>

                    <div className="flex gap-4 lg:text-sm">
                        {/* {   // username
                            search.user && (
                                <Link to={'/profile/'+search.user.username} className="text-sea-green hover:font-medium underline flex items-center gap-1">
                                    <BiSolidUserCircle />
                                    @{search.user.username}
                                </Link>
                            )
                        } */}

                        {/* time searched ago */}
                        <p>{TimeDifference(search.updated)} ago</p>

                        {/* number of comments */}
                        {/* <Link to={`/search/${search.pk}`} className="text-gray-500 underline flex items-center gap-1">
                            <MdModeComment />
                            {search.comment_count} {search.comment_count != 1 ? 'comments' : 'comment'}
                        </Link> */}
                        
                        {   // edit option ofor owners of search
                            loggedUser.id == search.user.id && 
                            (
                                <div>
                                    <Link to={`/search/update/${search.pk}`} className="text-gray-500 underline">Edit</Link>
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