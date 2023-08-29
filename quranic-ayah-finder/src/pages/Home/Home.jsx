import Searchbar  from "../../components/SearchBar/SearchBar"
import { useContext, useState } from 'react';
import { Context } from "../../Context";

import FeatureSection from "./FeatureSection";
import SearchResultsComponent from "./SearchResultsComponent";

export default function Home() {
    // const { loggedUser, setLoggedUSer } = useContext(Context);
    const [showResults, setShowResults] = useState(false)
    const [searchedText, setSearchedText] = useState('')
    const [verseDetails, setVerseDetails] = useState()

    const fetchData = (text,page=1) => {
        let query = 'https://api.quran.com/api/v4/search?q='+ text +'&page='+page
        console.log('query is '+query)
        fetch(query)
            .then((response) => response.json())
            .then((json) => 
                {setVerseDetails(json)
                    setShowResults(true)
                console.log("details fetched"+JSON.stringify(json))}
            )
    }

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
                (
                    <div className="search-bar flex flex-col items-center m-auto justify-center min-h-[80vh] w-[50%] z-10 relative  max-w-[640px]">
                        <Searchbar 
                            showResults={showResults} setShowResults={setShowResults} 
                            searchedText={searchedText} 
                            fetchData={fetchData} 
                            // verseDetails={verseDetails} 
                            setSearchedText={setSearchedText}
                        />
                    </div>
                ) :
                (
                    <div className="text-left  flex m-auto gap-4 p-0 w-[90%]"> 
                    {/*  items-center,justify-center,  w-[50%] */}
                        
                        <div className="w-[95%] m-auto">
                            <SearchResultsComponent 
                                searchedText={searchedText} 
                                fetchData={fetchData} 
                                resetSearch={resetSearch}
                                verseDetails={verseDetails} 
                            />
                        </div>
                        
                    </div>
                )
            }
           
        {
            !showResults && (
                <FeatureSection showResults={showResults} />

            )
        }
        </>
    )
    
}