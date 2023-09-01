import { useEffect, useState } from "react";
import BackgroundInfo from "../../components/VerseDetails/BackgroundInfo";
import ChapterInfo from "../../components/VerseDetails/ChapterInfo";
import VerseWords from "../../components/VerseDetails/VerseWords";
import Tafsir from "../../components/VerseDetails/Tafsir";
import Translations from "../../components/VerseDetails/Translations";
import Locations from "../../components/VerseDetails/Locations";
import BackButton from "../../components/Buttons/BackButton";
import { VscDebugRestart } from "react-icons/vsc";

export default function VerseDetails({chosenVerse, setChosenVerse, setShowDetails, resetSearch}) {
    const [chapterID, setChapterID] = useState(chosenVerse.verse_key.split(':')[0]) // get chapter id from chosen verse
    const [verseID, setVerseID] = useState(chosenVerse.verse_key.split(':')[1]) // get verse id from chosen verse
    
    const [chapter, setChapter] = useState() // basic chapter related info
    const [chapterInfo, setChapterInfo] = useState() // detailed chapter related info
    const [verseByWords, setVerseByWords] = useState() // each word with translation and transliteration
    const [tafsir, setTafsir] = useState() //tafsir
    
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
        <>
        <div className='flex justify-between'>
            <BackButton onClick={() =>  {setShowDetails(false);setChosenVerse()}} />
            <BackButton onClick={resetSearch} text={'search again'} icon={<VscDebugRestart />} />
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
    )
}

