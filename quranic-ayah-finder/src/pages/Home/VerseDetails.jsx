// import { useParams } from "react-router-dom"

import { useEffect, useState } from "react";

export default function VerseDetails({chosenVerse, setChosenVerse, setShowDetails}) {
    // const { id } = useParams()
    // const [data, setData] = useState({
    //     verseByWords: {},
    //     chapter: {},
    //     chapterInfo: {},
    //     tafsir: {}
    // })
    const [chapterID, setChapterID] = useState(chosenVerse.verse_key.split(':')[0])
    const [verseID, setVerseID] = useState(chosenVerse.verse_key.split(':')[1])
    const [chapter, setChapter] = useState()
    const [chapterInfo, setChapterInfo] = useState()
    const [verseByWords, setVerseByWords] = useState()
    const [tafsir, setTafsir] = useState()
    const [queries, setQueries] = useState([
        {
            query : 'https://api.quran.com/api/v4/verses/by_key/'+chosenVerse.verse_key+'?language=en&words=true&translations=131&tafsirs=169&word_fields=text_uthmani&fields=chapter_id&tafsirs=169',
            setVar : (data) => {console.log(data.verse);setVerseByWords(data.verse)} //setVerseByWords(data.verse)
        },
        // {
        //     query : verseByWords ? 'https://api.quran.com/api/v4/chapters/'+verseByWords.chapter_id+'?language=en':'',
        //     setVar : (data) => {console.log(data.chapter);setChapter(data.chapter)} 
        // },
        // {
        //     query : verseByWords ? 'https://api.quran.com/api/v4/chapters/'+verseByWords.chapter_id+'/info?language=en':'',
        //     setVar : (data) => {console.log(data.chapter_info);setChapterInfo(data.chapter_info)} 
        // },
        // {
        //     query : verseByWords ? 'http://api.quran-tafseer.com/tafseer/10/'+verseByWords.chapter_id+'/'+verseByWords.verse_number:'',
        //     setVar : (data) => {console.log(data);setTafsir(data)} 
        // }

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
    
    console.log(chosenVerse)
    console.log(verseID)
    useEffect(() => {
        queries.map((item,i) => {
            console.log('query '+item.query)
            fetch(item.query, {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((json) =>{
                // setVerseByWords(json.verse)
                item.setVar(json)
                console.log(json)
            })
            .catch(error => console.log(error))
        })
        console.log(queries)
        // fetch('https://api.quran.com/api/v4/verses/by_key/'+chosenVerse.verse_key+'?language=en&words=true&translations=131&tafsirs=169&word_fields=text_uthmani&fields=chapter_id&tafsirs=169', {
        // method: 'GET',
        // })
        // .then((response) => response.json())
        // .then((json) =>{
        //     // setVerseByWords(json.verse)
        //     // queries[0].setVar(json)
        //     setVerseByWords(json.verse)
        //     // fetchInfoData()
        //     // console.log(verseByWords)
        // }).then((json) =>{
        //     // setVerseByWords(json.verse)
        //     // queries[0].setVar(json)
        //     // setVerseByWords(json.verse)
        //     fetchInfoData()
        //     // console.log(verseByWords)
        // })
        // .then(() => {
        //     queries.map((item,i) => {
        //         console.log(item.query)
        //         fetch(item.query, {
        //         method: 'GET',
        //         })
        //         .then((response) => response.json())
        //         .then((json) =>{
        //             // setVerseByWords(json.verse)
        //             item.setVar(json)
        //             console.log(json)
        //         })
        //         .catch(error => console.log(error))
        //     })
            
        // })
        // .catch(error => console.log(error))

        // verseByWords && queries.map((item,i) => {
        //     console.log(item.query)
        //     fetch(item.query, {
        //     method: 'GET',
        //     })
        //     .then((response) => response.json())
        //     .then((json) =>{
        //         // setVerseByWords(json.verse)
        //         item.setVar(json)
        //         console.log(json)
        //     })
        //     .catch(error => console.log(error))
        // })
        //     console.log(queries[2].query)
        // fetch(queries[3].query, {
        // method: 'GET',
        // })
        // .then((response) => response.json())
        // .then((json) =>{
        //     // setVerseByWords(json.verse)
        //     queries[3].setVar(json)
        //     console.log(json)
        // })
        // .catch(error => console.log(error))

       
    }, [])

    // const [queries, setQueries] = useState([
    //     // {
    //     //     query : 'https://api.quran.com/api/v4/verses/by_key/'+chosenVerse.verse_key+'?language=en&words=true&translations=131&tafsirs=169&word_fields=text_uthmani&fields=chapter_id&tafsirs=169',
    //     //     setVar : (data) => {console.log(data.verse);setVerseByWords(data.verse)} //setVerseByWords(data.verse)
    //     // },
    //     {
    //         query : verseByWords ? 'https://api.quran.com/api/v4/chapters/'+verseByWords.chapter_id+'?language=en':'',
    //         setVar : (data) => {console.log(data.chapter);setChapter(data.chapter)} 
    //     },
    //     {
    //         query : verseByWords ? 'https://api.quran.com/api/v4/chapters/'+verseByWords.chapter_id+'/info?language=en':'',
    //         setVar : (data) => {console.log(data.chapter_info);setChapterInfo(data.chapter_info)} 
    //     },
    //     {
    //         query : verseByWords ? 'http://api.quran-tafseer.com/tafseer/10/'+verseByWords.chapter_id+'/'+verseByWords.verse_number:'',
    //         setVar : (data) => {console.log(data);setTafsir(data)} 
    //     }
        
    // ])

    const fetchInfoData = () => {
        console.log(verseByWords)
        setQueries(queries)

        queries.map((item,i) => {
            console.log('query '+item.query)
            fetch(item.query, {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((json) =>{
                // setVerseByWords(json.verse)
                item.setVar(json)
                console.log(json)
            })
            .catch(error => console.log(error))
        })
    }
    // const handleChange = (e) => {
    //     setForm({
    //         ...form,
    //         [e.target.name] : e.target.value
    //     })
    //     console.log(form)
    // }

    // console.log(chosenVerse)
    return(
        <>
        {
            verseByWords && <p> verse word retrieved with an id of   {verseByWords.id}</p>
        }
        {
            chapter && <p> chapter retrieved with an id of   {chapter.id}</p>
        }
        {
            chapterInfo && <p> chapter ifo retrieved with an id of   {chapterInfo.id}</p>
        }
        {
            tafsir && <p> tafseer retrieved with an id of   {tafsir.tafseer_id}</p>
        }
        <div className='w-1/3'>
            <button  onClick={() => {setShowDetails(false);setChosenVerse()}} >Go back</button>
        </div>
        <div className="mb-4 text-center text-3xl p-6">
             {chosenVerse.text}
            
        </div>
        <div className="mb-4 bg-custom-gray p-6 shadow">
            <div className="mt-2">
                <p>Location</p>
                <p className="text-sm text-slate-500 my-1" >
                    Verse {chosenVerse.verse_key}
                </p> 
            </div>
        </div>
        <div className="mb-4 bg-custom-gray p-6 shadow">
            <div className="mt-2">
                <p>Translations</p>
                {
                    chosenVerse.translations.map((translation,i) => (
                        <p className="text-sm text-slate-500 my-1" dangerouslySetInnerHTML={{__html: translation.text }} >
                        </p> 
                    ))
                }
            </div>
        </div>
        <div className="mb-4 bg-custom-gray p-6 shadow">
            <div className="mt-2">
                <p>Words</p>
                {/* <p>words for the verse are received with an id of {verseByWords.id} </p> */}
                {/* {
                    verseByWords ? <p>verse by words updated</p> :''
                } */}
                {
                    chosenVerse.words.map((translation,i) => (
                        <p className="text-sm text-slate-500 my-1" dangerouslySetInnerHTML={{__html: translation.text }} >
                        </p> 
                    ))
                }
            </div>
        </div>
        
        </>
    )
}

