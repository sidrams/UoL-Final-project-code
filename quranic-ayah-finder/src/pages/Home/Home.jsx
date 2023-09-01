import Searchbar  from "../../components/SearchBar/SearchBar"
import { useState } from 'react';
import FeatureSection from "./FeatureSection";
import SearchResultsComponent from "./SearchResultsComponent";

export default function Home() {
    const [showResults, setShowResults] = useState(false) // display results 
    const [searchedText, setSearchedText] = useState('') // text recognised from user uploaded image
    const [verseDetails, setVerseDetails] = useState() // fetched search results data from API 
    const [exactMatch, setExactMatch] = useState(false); // set results to match exactly

    const fetchData = (text, page=1) => {
        // fetch data from API and assign it to 'verseDetails'
        let query = exactMatch ? 
                    'https://api.quran.com/api/v4/search?q="'+ text +'"&page='+page :
                    'https://api.quran.com/api/v4/search?q='+ text +'&page='+page 

        fetch(query)
        .then((response) => response.json())
        .then((json) => {
            setVerseDetails(json)
            setShowResults(true)
        })
    }

    // reset search and variables to do a new search 
    const resetSearch = () => {
        setShowResults(false)
        setSearchedText('')
        setVerseDetails([])
    }

    return (
        <>
        <h1 className="hidden">Visual Quranic Ayah Finder</h1>
         
            {
                !showResults ? 
                (   // main search bar
                    <div className="search-bar flex flex-col items-center m-auto justify-center min-h-[80vh] w-[50%] z-10 relative  max-w-[640px]">
                        <Searchbar 
                            showResults={showResults} setShowResults={setShowResults} 
                            searchedText={searchedText} 
                            fetchData={fetchData} 
                            setSearchedText={setSearchedText}
                        />
                    </div>
                ) :
                (   // display fetched search results
                    <div className="text-left  flex m-auto gap-4 p-0 w-[90%]"> 
                        <div className="w-[95%] m-auto">
                            <SearchResultsComponent 
                                searchedText={searchedText} 
                                fetchData={fetchData} 
                                resetSearch={resetSearch}
                                verseDetails={verseDetails} 
                                showResults={showResults}
                                exactMatch={exactMatch}
                                setExactMatch={setExactMatch}
                            />
                        </div>
                    </div>
                )
            }
           
        {   // Home page component listing features of the website
            !showResults && (
                <FeatureSection showResults={showResults} />
            )
        }
        </>
    )
    
}