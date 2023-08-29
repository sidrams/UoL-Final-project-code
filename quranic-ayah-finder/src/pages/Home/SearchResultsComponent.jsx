import { useState } from "react"
import VerseDetails from "./VerseDetails"
import { VscDebugRestart } from "react-icons/vsc";
import BackButton from "../../components/Buttons/BackButton"
import ResultComponent from "../../components/SearchResults/ResultComponent"
import ResultHeader from "../../components/SearchResults/ResultHeader"
import PaginatorComponent from "../../components/SearchResults/Paginator"
import ImageResultHeader from "../../components/SearchResults/ImageResultHeader";

export default function SearchResultsComponent({searchedText, fetchData, resetSearch, verseDetails, exactMatch, setExactMatch}) {
    const [showDetails, setShowDetails] = useState(false)
    const [chosenVerse, setChosenVerse] = useState()

    return (
        <>
        {!verseDetails || verseDetails.length <= 0 ? 
        (
            <>
            {   
                searchedText != '' && searchedText.length >= 0 && 
                <>
                {
                    <ImageResultHeader searchedText={searchedText} onClick={() => fetchData(searchedText)} exactMatch={exactMatch} setExactMatch={setExactMatch} />
                }
                </>
            }
            </>
        ) : 
        (   // RENDER LIST OF SEARCH RESULTS
            !showDetails ? 
            (
                <>
                {/* query key word and number of results */}
                <div className="flex justify-between">
                    <ResultHeader verseDetails={verseDetails} />
                    <BackButton onClick={resetSearch} text={'search again'} icon={<VscDebugRestart />} />
                </div>
                
                {   // Verse component with translations
                    verseDetails.search.results.map((verse,i) => (
                        <ResultComponent onClick={() => {setShowDetails(true);setChosenVerse(verse)}} verse={verse} />
                    ))
                }
                
                {/* pagination for results */}
                <PaginatorComponent 
                    query={verseDetails.search.query}
                    total_pages={verseDetails.search.total_pages}
                    fetchData={fetchData}
                />
                </>
            ) : 
            (
                // Page with details of the chosen verse
                <VerseDetails 
                    chosenVerse={chosenVerse}
                    setChosenVerse={setChosenVerse}
                    setShowDetails={setShowDetails}
                    resetSearch={resetSearch}
                />
            )
    )}
    </>
    )
}