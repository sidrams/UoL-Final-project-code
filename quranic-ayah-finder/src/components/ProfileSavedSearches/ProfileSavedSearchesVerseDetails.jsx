import { useEffect, useState } from "react";
import BackgroundInfo from "../../components/VerseDetails/BackgroundInfo";
import ChapterInfo from "../../components/VerseDetails/ChapterInfo";
import VerseWords from "../../components/VerseDetails/VerseWords";
import Tafsir from "../../components/VerseDetails/Tafsir";
import Translations from "../../components/VerseDetails/Translations";
import Locations from "../../components/VerseDetails/Locations";
import BackButton from "../../components/Buttons/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { BiSolidEditAlt } from 'react-icons/bi'

// SHOW THE DETAILS OF THE CHOSEN VERSE FROM USER'S SAVED SEARCHES
export default function ProfileSavedSearchesVerseDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const csrftoken = Cookies.get('csrftoken');
    const [chosenVerse, setChosenVerse] = useState()
    const [chapterID, setChapterID] = useState() // get chapter id from chosen verse
    const [verseID, setVerseID] = useState() // get verse id from chosen verse
    
    const [chapter, setChapter] = useState() // basic chapter related info
    const [chapterInfo, setChapterInfo] = useState() // detailed chapter related info
    const [verseByWords, setVerseByWords] = useState() // each word with translation and transliteration
    const [tafsir, setTafsir] = useState() //tafsir

    const getQueries =(chapterID, verseID) => [
        {
            query : 'https://api.quran.com/api/v4/verses/by_key/'+chapterID+':'+verseID+'?language=en&words=true&translations=131,95,85,203,207,17,19&tafsirs=169&word_fields=text_uthmani&fields=chapter_id&tafsirs=169&fields=text_uthmani,translations,image_url,image_width,audio&translation_fields=resource_name',
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

    // get saved searched data for the chosen search
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
            setChosenVerse(json) // set chosen verse
            // set chapter id and verse id respectively for queries
            setChapterID(json.verse_key.split(':')[0])
            setVerseID(json.verse_key.split(':')[1])
            // call the function to fetch data by calling all API queries
            getData(json.verse_key.split(':'))
        })
        .catch(error => console.log(error))
    }, [])

    // fetch data for all sections 
    const getData = (IDs) => {
        const queries = getQueries(IDs[0],IDs[1])
        console.log(queries)
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
    }

    // get 21st for 21, etc...
    const getOrdinalNum = (n) => {
        return n + (n > 0 ? ["th", "st", "nd", "rd"][(n % 100 > 10 && n % 100 < 14) || n % 10 > 3 ? 0 : n % 10] : '');
    }

    return(
        chosenVerse && 
        <div className="text-left  flex m-auto gap-4 p-0 w-[90%]"> 
        <div className="w-[95%] m-auto">
            {/* header section */}
            <div className='flex justify-between'>
                <BackButton onClick={() => navigate('/profile/savedSearches')} />
                <div className='flex justify-between'>
                    <BackButton onClick={() => navigate('/profile/savedSearches/update/'+id)} icon={<BiSolidEditAlt />} text="Edit" />
                </div>
            </div>
            {/* arabic text of the verse */}
            <div className="mb-4 text-center text-3xl p-6">
                {verseByWords && verseByWords.text_uthmani}
            </div>

            
            {   // USER NOTES
                chosenVerse &&
                (
                    <div className="mb-4 bg-custom-gray p-6 shadow">
                        <h2>Your Notes</h2>
                        <p className="text-sm text-slate-500 my-1" >
                            {chosenVerse.user_notes}
                        </p>
                    </div>
                )
            }

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
        </div>
        </div>
    )
}