import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../Buttons/BackButton";
import { MdOutlineCancel } from "react-icons/md";

export default function ProfileSavedSearchesUpdate() {
    // allow to update verses saved in accounts
    const { id } = useParams()
    const { loggedUser, setLoggedUser} = useContext(Context) // get logged in user
    const csrftoken = Cookies.get('csrftoken'); // for making requests to API
    const navigate = useNavigate()
    const [ verse, setVerse] = useState()
    const [userNotes, setUserNotes] = useState('')

     // get previously saved user notes
     useEffect(() => {
        // fetch profile data for the chosen user
        fetch('http://127.0.0.1:8000/saveSearch/'+id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
        })
        .then((response) => response.json())
        .then((json) =>{
            setUserNotes(json.user_notes)
            setVerse(json)
        })
        .catch(error => console.log(error))
    }, [])

    // save search request
    const saveSearch = (e) => {
        e.preventDefault()

        // only logged in users can post
        if(!loggedUser) {
            alert('You need to be Logged in to save progress')
            setShowLogin(true)
        } else {
            // make request
            fetch(`http://127.0.0.1:8000/saveSearch/`+id, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                credentials: 'include',
                body: JSON.stringify(
                    {
                    // "verse_key": chosenVerse.verse_key, 
                    "user_notes": userNotes,
                    // "translation":translation
                })
            })
            .then((response) => response.json())
            .then((json) =>{
                navigate('/profile/savedSearches/details/'+id)
            })
            .catch(error => console.log(error))
        }
    }

    return (
        <div className="w-[90%] m-auto mb-4 bg-custom-gray p-6 shadow min-h-[60vh]">
             {/* header section - shows save search component or prompts to login */}
             <div className='flex justify-between items-center'>
                <BackButton onClick={() => navigate('/profile/savedSearches/details/'+id)} text="Go Back" />

                <h2 className="text-2xl font-bold text-sea-green text-left tracking-wide">
                    {loggedUser ? 'Updating Saved Verse in Account' : 'You need to be logged in to update this verse'}
                </h2>

                <BackButton onClick={() => navigate('/profile/savedSearches/details/'+id)} text={'Cancel'} icon={<MdOutlineCancel />} />
            </div>

            <div className="flex flex-col items-center mt-8 justify-between">
                <div className="mb-1 text-center flex flex-col gap-0">
                    {/* <h4 className=" text-3xl p-6 pb-3">{verse.text}</h4> */}
                    
                    <p className="text-gray-500">
                        {verse && <span dangerouslySetInnerHTML={{__html: verse.translation }}></span> }
                        ({verse && verse.verse_key})
                    </p>
                </div>

                {/* main input form */}
                <div className=" w-[80%] flex flex-col items-center">
                    {/* user notes input section */}
                    <form onSubmit={saveSearch} className="mt-6 mb-6 flex shadow-lg w-[100%]">
                        <input type="text " className="w-full" value={userNotes} onChange={(e) => {setUserNotes(e.target.value)}} placeholder="Add your updated notes here..."/>
                    </form>

                    {/* save ayah in user account */}
                    <button onClick={saveSearch} className="uppercase tracking-wider bg-sea-green text-white rounded-full">Update ayah</button>
                </div>
            </div>
        </div>
    )
}