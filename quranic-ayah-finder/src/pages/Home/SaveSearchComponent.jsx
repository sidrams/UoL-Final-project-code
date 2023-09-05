import { MdOutlineCancel, MdQuiz } from "react-icons/md";
import BackButton from "../../components/Buttons/BackButton";
import LoginModalComponent from "../../components/Login/LoginModalComponent";
import { VscDebugRestart } from "react-icons/vsc";
import { BsCardHeading, BsFillCheckCircleFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { Context } from "../../Context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function SaveSearchComponent({ chosenVerse, verseByWords, verseDetails, resetSearch, setChosenVerse, setShowSaveVerse, setShowDetails}) {
    // allow to save verses to accounts
    const { loggedUser, setLoggedUser} = useContext(Context) // get logged in user
    const csrftoken = Cookies.get('csrftoken'); // for making requests to API
    const [userNotes, setUserNotes] = useState('') // store user note
    const [verseSaved, setVerseSaved] = useState(false) // true if the verse has been saved successfully
    // translation that will be displayed and saved with verse
    const translation = chosenVerse.translations.length > 0 ? chosenVerse.translations[0].text : verseByWords.translations[0].text

    // save search request
    const saveSearch = (e) => {
        e.preventDefault()

        // only logged in users can post
        if(!loggedUser) {
            alert('You need to be Logged in to save progress')
            setShowLogin(true)
        } else {
            // make request
            fetch(`http://127.0.0.1:8000/saveSearch/`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                credentials: 'include',
                body: JSON.stringify(
                    {
                    "verse_key": chosenVerse.verse_key, 
                    "user_notes": userNotes,
                    "translation":translation
                })
            })
            .then((response) => response.json())
            .then((json) =>{
                setVerseSaved(true)
            })
            .catch(error => console.log(error))
        }
    }

    // take back to search results page
    const continueSearch = () => {
        setVerseSaved(false);
        setShowSaveVerse(false);
        setShowDetails(false);
        setChosenVerse()
    }

    return (
        <div className="w-[90%] m-auto mb-4 bg-custom-gray p-6 shadow min-h-[60vh]">
            {/* header section - shows save search component or prompts to login */}
            <div className='flex justify-between items-center'>
                <BackButton onClick={() =>  {setShowSaveVerse(false)}} text="Go Back" />

                <h2 className="text-2xl font-bold text-sea-green text-left tracking-wide">
                    {loggedUser ? 'Saving Verse to Account' : 'You need to be logged in to save this verse'}
                </h2>

                <BackButton onClick={() => setShowSaveVerse(false)} text={'Cancel'} icon={<MdOutlineCancel />} />
            </div>

            {   // if user is not logged in , show component ot allow user to login   
                !loggedUser ? 
                (
                    <>
                    <LoginModalComponent setShowLogin={setShowSaveVerse} />
                    </>
                ) :
                (   // if user is logged in show the option to save the chosen verse
                    <>
                    <div className="flex flex-col items-center mt-8 justify-between">
                        <div className="mb-1 text-center flex flex-col gap-0">
                            <h4 className=" text-3xl p-6 pb-3">{chosenVerse.text}</h4>
                            
                            <p className="text-gray-500">
                                <span dangerouslySetInnerHTML={{__html: translation }}></span> 
                                ({chosenVerse.verse_key})
                            </p>
                        </div>
                        
                        {   // allow user to add notes along with their saved searches
                            !verseSaved &&     
                            <div className=" w-[80%] flex flex-col items-center">
                                {/* user notes input section */}
                                <form onSubmit={saveSearch} className="mt-6 mb-6 flex shadow-lg w-[100%]">
                                    <input type="text " className="w-full" value={userNotes} onChange={(e) => {setUserNotes(e.target.value)}} placeholder="Add your notes here..."/>
                                </form>

                                {/* save ayah in user account */}
                                <button onClick={saveSearch} className="uppercase tracking-wider bg-sea-green text-white rounded-full">save ayah</button>
                            </div>
                        }
                        
                        {/* if verse is saved show relevant navigation buttons including link to see user's all saved searches */}
                        {verseSaved && 
                        <div className="flex flex-col items-center">
                            <p className="flex gap-2  text-xl text-sea-green uppercase font-medium tracking-wider text-center mt-6">
                                <span className="text-3xl"><BsFillCheckCircleFill /></span>
                                Verse Saved 
                            </p>
                            <div className="flex gap-4 m-auto my-6">
                                <BackButton onClick={continueSearch} text="Continue Search" icon={<VscDebugRestart />} customStyle="hover:bg-medium-gray hover:text-navy-blue" />
                                <BackButton onClick={resetSearch} text={<Link to="">Restart Search</Link>} icon={<BsCardHeading />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                                <BackButton onClick='' text={<Link to={`/profile/savedSearches`} >View my Saved Searches</Link>} icon={<MdQuiz />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                            </div>
                        </div>
                        }
                    </div>
                    </>
                )
            }
        </div>
    )
}