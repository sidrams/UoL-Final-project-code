import Searchbar  from "../../components/SearchBar/SearchBar"
import { useContext, useState } from 'react';
import { Context } from "../../Context";

import FeatureSection from "./FeatureSection";

export default function Home() {
    const { loggedUser, setLoggedUSer } = useContext(Context);
    const [showResults, setShowResults] = useState(false)
    
    return (
        <>
        <h1 className="hidden">Visual Quranic Ayah Finder</h1>
        {/* {
            loggedUser ? "User logged in" : "USer not logged in"
        } */}
        
        
        <div className="search-bar flex flex-col items-center m-auto justify-center min-h-[80vh] w-[50%] z-10 relative">
            {/* <div className="rounded-full absolute z-[-4] -right-1/4 top-[5%] ">
                <img src={borderEllipse} alt="border design element" className="absolute logo-border" />
                <img src={quranVector} alt="vector image of a quran" className="p-[3%]"/>
            </div>
            <div className="w-full text-left text-xl text-[black]">
                SEARCH FOR A ... <span className="text-sea-green font-bold">verse by uploading an image</span>
            </div> */}
            <Searchbar showResults={showResults} setShowResults={setShowResults} />
        </div>
        {
            !showResults && (
                <FeatureSection showResults={showResults} />

            )
        }
        </>
    )
    
}