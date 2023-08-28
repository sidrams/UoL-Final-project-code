import Searchbar  from "../../components/SearchBar/SearchBar"
import { useContext, useState } from 'react';
import { Context } from "../../Context";

import FeatureSection from "./FeatureSection";
import SearchResultsComponent from "./SearchResultsComponent";

export default function Home() {
    const { loggedUser, setLoggedUSer } = useContext(Context);
    const [showResults, setShowResults] = useState(false)
    const [searchedText, setSearchedText] = useState('')
    const [verseDetails, setVerseDetails] = useState()

    const fetchData = (text) => {
        let query = 'https://api.quran.com/api/v4/search?q='+ text +'&page=2'
        console.log('query is '+query)
        fetch(query)
            .then((response) => response.json())
            .then((json) => 
                {setVerseDetails(json)
                    setShowResults(true)
                console.log("details fetched"+JSON.stringify(json))}
            )
    }

    return (
        <>
        <h1 className="hidden">Visual Quranic Ayah Finder</h1>
        {/* {
            loggedUser ? "User logged in" : "USer not logged in"
        } */}
        
         
        <div className="search-bar flex flex-col items-center m-auto justify-center min-h-[80vh] w-[50%] z-10 relative  max-w-[640px]">
            {/* <div className="rounded-full absolute z-[-4] -right-1/4 top-[5%] ">
                <img src={borderEllipse} alt="border design element" className="absolute logo-border" />
                <img src={quranVector} alt="vector image of a quran" className="p-[3%]"/>
            </div>
            <div className="w-full text-left text-xl text-[black]">
                SEARCH FOR A ... <span className="text-sea-green font-bold">verse by uploading an image</span>
            </div> */}
            {
                !showResults ? 
                (
                    <Searchbar 
                        showResults={showResults} setShowResults={setShowResults} 
                        searchedText={searchedText} 
                        fetchData={fetchData} 
                        verseDetails={verseDetails} 
                    />
                ) :
                (
                    <SearchResultsComponent searchedText={searchedText} fetchData={fetchData} verseDetails={verseDetails} />
                )
            }
           
        </div>
        {
            !showResults && (
                <FeatureSection showResults={showResults} />

            )
        }
        </>
    )
    
}