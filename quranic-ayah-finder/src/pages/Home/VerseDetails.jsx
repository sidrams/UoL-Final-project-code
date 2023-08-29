// import { useParams } from "react-router-dom"

import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import BackgroundInfo from "../../components/VerseDetails/BackgroundInfo";
import ChapterInfo from "../../components/VerseDetails/ChapterInfo";

export default function VerseDetails({chosenVerse, setChosenVerse, setShowDetails}) {
    const [chapterID, setChapterID] = useState(chosenVerse.verse_key.split(':')[0]) // get chapter id from chosen verse
    const [verseID, setVerseID] = useState(chosenVerse.verse_key.split(':')[1]) // get verse id from chosen verse
    const [chapter, setChapter] = useState()
    const [chapterInfo, setChapterInfo] = useState()
    const [verseByWords, setVerseByWords] = useState()
    const [tafsir, setTafsir] = useState()
    const [queries, setQueries] = useState([
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
        
    ])

    useEffect(() => {
        queries.map((item,i) => {
            console.log('query '+item.query)
            fetch(item.query, {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((json) =>{
                item.setVar(json)
                console.log(json)
            })
            .catch(error => console.log(error))
        })
    }, [])

    const getOrdinalNum = (n) => {
        return n + (n > 0 ? ["th", "st", "nd", "rd"][(n % 100 > 10 && n % 100 < 14) || n % 10 > 3 ? 0 : n % 10] : '');
    }

    return(
        <>
        <div className='w-1/3'>
            <button  onClick={() => {setShowDetails(false);setChosenVerse()}} >Go back</button>
        </div>
        <div className="mb-4 text-center text-3xl p-6">
             {chosenVerse.text}
            
        </div>

        {
            verseByWords && chapter &&
            (
                <div className="mb-4 bg-custom-gray p-6 shadow">
                    <h2>Location</h2>
                    <p className="text-sm text-slate-500 my-1" >
                        {chosenVerse.verse_key}
                    </p> 
                    <p className="text-sm text-slate-500 my-1" >
                        This verse is the {getOrdinalNum(verseID)} verse in 'Surah {chapter.name_simple}' ({chapter.name_arabic}), 
                        the {getOrdinalNum(verseByWords.chapter_id)} chapter of the Holy Quran.
                        The verse can be found in the {getOrdinalNum(verseByWords.juz_number)} Juz and 
                        in the {getOrdinalNum(verseByWords.ruku_number)} Ruku of the {getOrdinalNum(verseByWords.chapter_id)} chapter.
                    </p>
                    <p className="text-sm text-slate-500 my-1" >
                            This verse/ayah contains a total of  {verseByWords.words.length} words.
                    </p>
                </div>
            )
        }
      
        <div className="mb-4 bg-custom-gray p-6 shadow">
            <h2>Translations</h2>
            {
                chosenVerse.translations.map((translation,i) => (
                    <p className="text-sm text-slate-500 my-1">
                        <span dangerouslySetInnerHTML={{__html: translation.text }} >
                        </span> 
                        <span className="text-slate-400"> ({translation.name})</span>
                    </p>
                ))
            }
        </div>

        {
            tafsir && 
            (
                <div className="mb-4 bg-custom-gray p-6 shadow">
                    <h2>Tafsir</h2>
                    <p className="text-sm text-slate-500 my-1" >
                        {tafsir.text}  
                        <span className="text-slate-400"> ({tafsir.tafseer_name})</span>
                    </p>
                </div>
            )
        }
        
        {
            verseByWords && 
            (
                <div className="mb-4 bg-custom-gray p-6 shadow">
                    <h2>Words</h2>
                    {/* {
                        chosenVerse.words.map((translation,i) => (
                            <p className="text-sm text-slate-500 my-1" dangerouslySetInnerHTML={{__html: translation.text }} >
                            </p> 
                        ))
                    } */}
                    <div className="card mt-4">
                        <DataTable value={verseByWords.words} paginator rows={6} tableStyle={{ minWidth: '50rem', fontSize: '14px' }}>
                            <Column field="position" header="Position In verse"></Column>
                            <Column field="text_uthmani" header="Arabic Text"></Column>
                            <Column field="translation.text" header="Translation"></Column>
                            <Column field="transliteration.text" header="Transliteration"></Column>
                        </DataTable>
                    </div>
                </div>
            )
        }
        
        {
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

