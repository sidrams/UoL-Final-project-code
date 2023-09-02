import { useContext, useEffect, useState } from "react";
import {Context} from '../../Context'
import BackgroundInfo from "../../components/VerseDetails/BackgroundInfo";
import ChapterInfo from "../../components/VerseDetails/ChapterInfo";
import VerseWords from "../../components/VerseDetails/VerseWords";
import Tafsir from "../../components/VerseDetails/Tafsir";
import Translations from "../../components/VerseDetails/Translations";
import Locations from "../../components/VerseDetails/Locations";
import BackButton from "../../components/Buttons/BackButton";

// saving verse related
import { BsBookmarkFill, BsCardHeading } from "react-icons/bs";
import { MdOutlineCancel, MdQuiz } from "react-icons/md";
import LoginModalComponent from '../../components/Login/LoginModalComponent'
import Cookies from "js-cookie";
import { VscDebugRestart } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function VerseDetails({chosenVerse, setChosenVerse, setShowDetails, resetSearch}) {
    const [chapterID, setChapterID] = useState(chosenVerse.verse_key.split(':')[0]) // get chapter id from chosen verse
    const [verseID, setVerseID] = useState(chosenVerse.verse_key.split(':')[1]) // get verse id from chosen verse
    
    const [chapter, setChapter] = useState() // basic chapter related info
    const [chapterInfo, setChapterInfo] = useState() // detailed chapter related info
    const [verseByWords, setVerseByWords] = useState() // each word with translation and transliteration
    const [tafsir, setTafsir] = useState() //tafsir

    // allow to save verses to accounts
    const [showSaveVerse, setShowSaveVerse] = useState(false) // show the component to allow user to save post 
    const { loggedUser, setLoggedUser} = useContext(Context)
    const [userNotes, setUserNotes] = useState('')
    const [verseSaved, setVerseSaved] = useState(false)
    const csrftoken = Cookies.get('csrftoken'); // for making requests to API
    
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
                    "user_notes": userNotes
                })
            })
            .then((response) => response.json())
            .then((json) =>{
                // setComments([...comments,json])
                // setNewComment('')
                setVerseSaved(true)
            })
            .catch(error => console.log(error))
        }
    }

    console.log(chosenVerse)
    const queries = [
        {
            query : 'https://api.quran.com/api/v4/verses/by_key/'+chosenVerse.verse_key+'?language=en&words=true&translations=131&tafsirs=169&word_fields=text_uthmani&fields=chapter_id&tafsirs=169',
            setVar : (data) => {console.log(data.verse);setVerseByWords(data.verse)} 
        },
        {
            query :  'https://api.quran.com/api/v4/chapters/'+chapterID+'?language=en',
            setVar : (data) => {console.log(data.chapter);setChapter(data.chapter)} 
        },
        {
            query :  'https://api.quran.com/api/v4/chapters/'+chapterID+'/info?language=en',
            setVar : (data) => {console.log(data.chapter_info);setChapterInfo(data.chapter_info)} 
        },
        {
            query :  'http://api.quran-tafseer.com/tafseer/10/'+chapterID+'/'+verseID,
            setVar : (data) => {console.log(data);setTafsir(data)} 
        }
        
    ]

    // fetch data for all sections 
    useEffect(() => {
        queries.map((item,i) => {
            console.log('query '+item.query)
            fetch(item.query, {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((json) =>{
                item.setVar(json)
            })
            .catch(error => console.log(error))
        })
    }, [])

    // get 21st for 21, etc...
    const getOrdinalNum = (n) => {
        return n + (n > 0 ? ["th", "st", "nd", "rd"][(n % 100 > 10 && n % 100 < 14) || n % 10 > 3 ? 0 : n % 10] : '');
    }

    return(
        !showSaveVerse ? <>
        <div className='flex justify-between'>
            <BackButton onClick={() =>  {setShowDetails(false);setChosenVerse()}} />
            <BackButton onClick={() => setShowSaveVerse(true)} text={'save ayah'} icon={<BsBookmarkFill />} />
        </div>
        <div className="mb-4 text-center text-3xl p-6">
             {chosenVerse.text}
        </div>

        {   // LOCATION
            verseByWords && chapter &&
            (
                <div className="mb-4 bg-custom-gray p-6 shadow">
                    <Locations chosenVerse={chosenVerse} verseID={verseID} verseByWords={verseByWords} chapter={chapter} getOrdinalNum={getOrdinalNum} />
                </div>
            )
        }
      
        {   // TRANSLATIONS
            verseByWords && 
            (
                <div className="mb-4 bg-custom-gray p-6 shadow">
                    <Translations chosenVerse={chosenVerse} verseByWords={verseByWords} />
                </div>
            )
        }
        

        {   // TAFSIR
            tafsir && 
            (
                <div className="mb-4 bg-custom-gray p-6 shadow">
                    <Tafsir tafsir={tafsir} />
                </div>
            )
        }
        
        {   // WORDS
            verseByWords && 
            (
                <div className="mb-4 bg-custom-gray p-6 shadow">
                    <VerseWords verseByWords={verseByWords} />
                </div>
            )
        }
        
        {   // CHAPTER INFO AND ITS BACKGROUND
            chapter && chapterInfo && 
            (
                <>
                <div className="mb-4 bg-custom-gray p-6 shadow">
                    <ChapterInfo chapter={chapter} chapterInfo={chapterInfo} getOrdinalNum={getOrdinalNum} chapterID={chapterID} />
                </div>
                <div className="mb-4 bg-custom-gray p-6 shadow">
                    <BackgroundInfo chapter={chapter} chapterInfo={chapterInfo} />
                   
                </div>
                </>
            )
        }
       
        </>
        
        : 
        (
            <div className="w-[90%] m-auto mb-4 bg-custom-gray p-6 shadow min-h-[60vh]">
                <div className='flex justify-between items-center'>
                    <BackButton onClick={() =>  {setShowSaveVerse(false)}} text="Go Back" />

                    <h2 className="text-2xl font-bold text-sea-green text-left tracking-wide">
                        {loggedUser ? 'Saving Verse to Account' : 'You need to be logged in to save this verse'}
                    </h2>

                    <BackButton onClick={() => setShowSaveVerse(false)} text={'Cancel'} icon={<MdOutlineCancel />} />
                </div>
                {
                    !loggedUser ? 
                    (
                        <>
                        <LoginModalComponent setShowLogin={setShowSaveVerse} />
                        </>
                    ) :
                    (   
                        <>
                        {/* {
                            verseSaved ? 
                            (
                                // <p>verse saved !</p>
                                <div className="flex gap-4 m-auto">
                                    <BackButton onClick={''} text="Restart Quiz" icon={<VscDebugRestart />} customStyle="hover:bg-medium-gray hover:text-navy-blue" />
                                    <BackButton onClick={''} text={<Link to={``} >Save my progress</Link>} icon={<MdQuiz />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                                    <BackButton onClick='' text={<Link to="/guides">Go back to topics</Link>} icon={<BsCardHeading />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                                </div>
                            ) :
                            ( */}
                                <div className="flex flex-col items-center mt-8 justify-between">
                                    <div className="mb-1 text-center flex flex-col gap-0">
                                        <h4 className=" text-3xl p-6 pb-3">{chosenVerse.text}</h4>
                                        
                                        <p className="text-gray-500">
                                            <span dangerouslySetInnerHTML={{__html: chosenVerse.translations[0].text }}></span>
                                            ({chosenVerse.verse_key})
                                        </p>
                                    </div>
                                    
                                    {
                                        !verseSaved &&     
                                        <div className=" w-[80%] flex flex-col items-center">
                                            {/* user notes input section */}
                                            <form action="" className="mt-6 mb-6 flex shadow-lg w-[100%]">
                                                <input type="text " className="" value={userNotes} onChange={(e) => setUserNotes(e.target.value)} placeholder="Add your notes here..."/>
                                            </form>

                                            {/* save ayah in user account */}
                                            <button onClick={saveSearch} className="uppercase tracking-wider bg-sea-green text-white rounded-full">save ayah</button>
                                        </div>
                                    }
                                    

                                    {verseSaved && 
                                    <div className="flex flex-col items-center">
                                        <p className="flex gap-2  text-xl text-sea-green uppercase font-medium tracking-wider text-center mt-6">
                                            <span className="text-3xl"><BsFillCheckCircleFill /></span>
                                            Verse Saved 
                                        </p>
                                        <div className="flex gap-4 m-auto my-6">
                                            <BackButton onClick={() => {setVerseSaved(false);setShowSaveVerse(false);setShowDetails(false);setChosenVerse()}} text="Continue Search" icon={<VscDebugRestart />} customStyle="hover:bg-medium-gray hover:text-navy-blue" />
                                            <BackButton onClick={resetSearch} text={<Link to="">Restart Search</Link>} icon={<BsCardHeading />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                                            <BackButton onClick='' text={<Link to={`/profile/savedSearches`} >View my Searches</Link>} icon={<MdQuiz />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                                        </div>
                                    </div>
                                    }
                                </div>
                            {/* )
                        } */}
                        
                        </>
                    )
                }
                
            </div>
        )
        
    )
}

