import { Link } from "react-router-dom"
import PaginatorComponent from "./Paginator"
import { useState } from "react"
import VerseDetails from "./VerseDetails"
import BackButton from "../../components/Buttons/BackButton"
import { VscDebugRestart } from "react-icons/vsc";

export default function SearchResultsComponent({searchedText, fetchData, resetSearch, verseDetails, showResults}) {
    const [showDetails, setShowDetails] = useState(false)
    const [chosenVerse, setChosenVerse] = useState()
    return (
        <>
        {/* <div className='w-1/3'>
            {/* <button  onClick={resetSearch} >search again</button> 
            <BackButton onClick={resetSearch} text={'search again'} icon={<VscDebugRestart />} /> 
        </div>*/}
        <div>

            {/* {searchedText != '' && searchedText.length >= 0 ? 
            (
                <>
                <div className="mb-4 text-center text-3xl p-6">
                    Text identified : {searchedText}
                </div>
                <button onClick={() => fetchData(searchedText)}>Find detailed information</button>
                </>
            ) : 
            (
                ''
            )
            } */}
            {/* {
                searchedText != '' && searchedText.length >= 0 && 
                <>
                {
                    !showDetails && 
                    (
                        <>
                        <div className="mb-4 text-center text-3xl p-6">
                            Text identified : {searchedText}
                        </div>
                        <button onClick={() => fetchData(searchedText)}>Find detailed information</button>
                        </>
                    )
                }
                </>
            } */}
        </div>
        <div >
            {/* className="overflow-scroll  h-[60vh] " */}
            {!verseDetails || verseDetails.length <= 0 ? (
                <div>
                {
                    searchedText != '' && searchedText.length >= 0 && 
                    <>
                    {
                        // !showDetails && 
                        // (
                            <>
                            <div className="mb-4 text-center text-3xl p-6">
                                Text identified : {searchedText}
                            </div>
                            <div className="flex justify-center items-center ">
                            <button className="capitalize" onClick={() => fetchData(searchedText)}>Find detailed information</button>
                            </div>
                            </>
                        // )
                    }
                    </>
                }
                </div>
            ) : (
                
                // {
                    !showDetails ? 
                    (
                        <>
                        <div className="flex justify-between">
                            <div>
                                <h2 className="mt-6 text-2xl font-bold">Verses search result for '{verseDetails.search.query}'</h2>
                                <p className="text-sm font-medium text-slate-500 my-1 mb-6">{verseDetails.search.total_results} verses found</p>    
                            </div>
                            <BackButton onClick={resetSearch} text={'search again'} icon={<VscDebugRestart />} />
                        </div>
                        
                        {/* <p>total results {verseDetails.search.total_results}</p>
                        <p>currently showing {verseDetails.search.results.length}</p>
                        <p>showing {verseDetails.search.current_page} / {verseDetails.search.total_pages}</p> */}
                        { 
                            verseDetails.search.results.map((verse,i) => (
                            <Link to=''>
                            {/* // {`/verse-details/${verse.verse_id}`} */}

                                <div key={verse.verse_key} onClick={() => {setShowDetails(true);setChosenVerse(verse)}} className="mb-4 bg-custom-gray p-6 shadow">
                                    Verse {verse.verse_key} - {verse.text}
                                    <div className="mt-2">
                                        {
                                            verse.translations.map((translation,i) => (
                                                <p className="text-sm text-slate-500 my-1" dangerouslySetInnerHTML={{__html: translation.text }} >
                                                    
                                                </p> 
                                            ))
                                            // console.log(verse.translations)
                                        }
                                    </div>
                                </div>
                            </Link>
                        ))}
                         <PaginatorComponent 
                            query={verseDetails.search.query}
                            total_pages={verseDetails.search.total_pages}
                            fetchData={fetchData}
                        />
                      </>
                    ) : 
                    (
                        // <p>show details</p>
                        <VerseDetails 
                            chosenVerse={chosenVerse}
                            setChosenVerse={setChosenVerse}
                            setShowDetails={setShowDetails}
                            resetSearch={resetSearch}
                        />
                    )
                // }
                
        )}
        </div>
       

        </>
    )
}