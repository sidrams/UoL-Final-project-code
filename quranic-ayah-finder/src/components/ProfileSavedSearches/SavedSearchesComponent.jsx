import { Link } from "react-router-dom";
import TimeDifference from "../Time/TimeDifference";
import { useContext, useState } from "react";
import { Context } from "../../Context";
import SavedSearchToggleMenu from "./SavedSearchToggleMenu";
import SavedVerseDeleteConfirmation from "./SavedVerseDeleteConfirmation";

// COMPONENT SHOWN ON USER PROFILE FOR 'Saved Searches'
export default function SavedSearchesComponent({savedSearches, inputText}) {
    const { loggedUser, setLoggedUser } = useContext(Context)
    const [showDelete, setShowDelete] = useState(false) // show delete confirmation modal if prompted

    console.log(savedSearches)
    return (
        // search component
        <div className="lg:w-3/4 w-[95%] lg:mx-0 mx-auto mt-8">
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
                        search.user_notes && search.user_notes.toLowerCase().includes(inputText) ||
                        search.translation && search.translation.toLowerCase().includes(inputText) ||
                        search.verse_key && search.verse_key.toLowerCase().includes(inputText)
                    ) {
                    return search;
                    }
                })
                .map((search,i) => (
                // render search components
                <div key={i} className="mb-4 flex  w-full text-slate-400  tracking-wider bg-custom-gray xl:p-8 p-6 shadow-md w-[70%] overflow-auto rounded flex flex-col justify-center text-left hover:bg-medium-gray ">
                    <div className="flex justify-between">
                        <Link to={`/profile/savedSearches/details/`+search.id}>
                            {/* display verse key */}
                            <h4> Verse {search.verse_key} </h4> 
                            {/* display corresponding translation */}
                            <h3 className="font-bold text-gray-600 text-lg mb-2 hover:text-sea-green" dangerouslySetInnerHTML={{__html: search.translation }}></h3>
                        </Link>

                        {   // toggle menu with delete option for owners of search
                            loggedUser && loggedUser.id == search.user.id && 
                            (
                                <SavedSearchToggleMenu search={search} setShowDelete={setShowDelete} />
                            ) 
                        }
                        {
                            showDelete && <SavedVerseDeleteConfirmation search_id={search.id} setShowDelete={setShowDelete} />
                        }
                    </div>

                    <p className="mb-4"><em>Notes : {search.user_notes && search.user_notes}</em></p>
                    
                    <div className="flex gap-4 lg:text-sm">
                        {/* time searched ago */}
                        <p>{TimeDifference(search.updated)} ago</p>
                        
                        {   // edit option for owners of search
                            loggedUser.id == search.user.id && 
                            (
                                <div>
                                    <Link to={`/profile/savedSearches/update/${search.id}`} className="text-gray-500 underline">Edit</Link>
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