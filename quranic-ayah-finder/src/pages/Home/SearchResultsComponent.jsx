import { useState } from "react"
import VerseDetails from "./VerseDetails"
import { VscDebugRestart } from "react-icons/vsc";
import BackButton from "../../components/Buttons/BackButton"
import ResultComponent from "../../components/SearchResults/ResultComponent"
import ResultHeader from "../../components/SearchResults/ResultHeader"
import PaginatorComponent from "../../components/SearchResults/Paginator"
import ImageResultHeader from "../../components/SearchResults/ImageResultHeader";

// COMPONENT SHOWN AFTER USER SEARCHES USING TEXT OR IMAGE ON MAIN PAGE 
// TO SHOW ALL RETRIEVED RESULTS
export default function SearchResultsComponent({searchedText, fetchData, resetSearch, verseDetails, exactMatch, setExactMatch}) {
    const [chosenVerse, setChosenVerse] = useState() // the verse selected by user to view
    const [showDetails, setShowDetails] = useState(false) // show details component for the chosen verse

    return (
        <>
        {!verseDetails || verseDetails.length <= 0 ? 
        (
            <>
            {   
                searchedText != '' && searchedText.length >= 0 && 
                <>
                {   //header to be shown if a user searches by uploading an image
                    <ImageResultHeader searchedText={searchedText} 
                        onClick={() => fetchData(searchedText)} 
                        exactMatch={exactMatch} setExactMatch={setExactMatch} 
                    />
                }
                </>
            }
            </>
        ) : 
        (   // RENDER LIST OF SEARCH RESULTS
            !showDetails ? 
            (
                <>
                {/* show query key word and number of results */}
                <div className="flex justify-between lg:flex-row flex-col">
                    <ResultHeader verseDetails={verseDetails} resetSearch={resetSearch} />
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