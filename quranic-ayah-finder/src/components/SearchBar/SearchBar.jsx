import React, { useState, useRef, useEffect } from "react";
import { BsUpload } from "react-icons/bs"
import SearchModal from "./SearchModal";
import quranVector from '../../assets/quran vector.png'
import borderEllipse from '../../assets/Ellipse.svg'
import { AiFillCheckCircle } from "react-icons/ai";
import PaginatorComponent from "../../pages/Home/Paginator";
// import "./Searchbar.css"

// export const Searchbar = () => {
export default function Searchbar({showResults, setShowResults, searchedText, fetchData, verseDetails}) {
    // const [input, setInput] = useState("")
    const [textInput, setTextInput] = useState('')
    const [showModal, setShowModal] = useState(false)
    
    const ref = useRef(null);

    useEffect(() => {
        if(!showResults) {
            const handleClick = event => {
                // console.log('enter clicked');
                if (event.keyCode === 13 || event.key === 'Enter') {
                    setTextInput(event.target.value)
                    fetchData(event.target.value)
                    console.log(textInput)
                    // console.log(event.target.value);
                }
    
            };
    
            const element = ref.current;
    
            element.addEventListener('keypress', handleClick);
    
            return () => {
                element.removeEventListener('keypress', handleClick);
            };
        }
    }, []);

    

    const handleChange = (value) => {
        // console.log("setting input text as "+value)
        setTextInput(value)
    }

    return (
        <>
        {
            // !showResults ?
            // (
                <>
                 <div className="rounded-full absolute z-[-4] -right-1/4 top-[5%] ">
                    <img src={borderEllipse} alt="border design element" className="absolute logo-border" />
                    <img src={quranVector} alt="vector image of a quran" className="p-[3%]"/>
                </div>
                <div className="w-full text-left text-xl text-[black]">
                    SEARCH FOR A ... <span className="text-sea-green font-bold">verse by uploading an image</span>
                </div>
                <div className="search-bar bg-[white] p-2 rounded-md my-0 mx-auto flex justify-between lg:w-full">
                    <input 
                        className="w-2/3"
                        placeholder="Enter a keywords here or upload an image..." 
                        value={textInput} 
                        onChange={(e) => {
                            handleChange(e.target.value)
                        }}
                        ref={ref}
                    />
                    <button 
                        className="flex"
                        onClick={() => setShowModal(true)}
                    >
                        <BsUpload />Upload image
                        
                    </button>
                    {showModal ? (
                        <>
                    <SearchModal 
                            setShowResults={setShowResults}
                            setShowModal={setShowModal} 
                            searchedText={searchedText} 
                            setSearchedText={setSearchedText} 
                        />
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                </div>
                <button
                    onClick={() => fetchData(textInput)}
                    className="w-[25%] m-4 bg-blackish-blue text-[white] hover:text-blackish-blue hover:bg-[white] px-1 py-[1.5%] uppercase tracking-wider font-medium text-sm"
                >
                    Search
                </button>
                </>
            // )
            // :
            // (
            //     <p>some result should be shown here</p>
                // <>
                // <div>
                //     {searchedText != '' && searchedText.length >= 0 ? (
                //         // <tr>
                //         // <td colSpan="6" align="center">
                //         //     <b>No searched text</b>
                //         // </td>
                //         // </tr>
                //         <>
                //         <div>text identified is : {searchedText}</div>
                //         <button onClick={() => fetchData(searchedText)}>Find detailed information</button>
                //         </>
                //     ) : (
                //         ''
                // )}
                // </div>
                // <div>
                //     {!verseDetails || verseDetails.length <= 0 ? (
                //         <div></div>
                //     ) : (
                //         <>
                //         <h2 className="my-6 text-xl font-bold">Verses search result for '{verseDetails.search.query}'</h2>
                //         <p>total results {verseDetails.search.total_results}</p>
                //         <p>showing {verseDetails.search.current_page} / {verseDetails.search.total_pages}</p>
                //         { 
                //             verseDetails.search.results.map((verse,i) => (
                //             <div key={verse.verse_key} className="mb-4">
                //                 Verse {verse.verse_key} - {verse.text}
                //             </div>
                //         ))}
                        
                //         {/* <div>{JSON.stringify(verseDetails.search.results)}</div> */}
                        
                //         </>
                // )}
                // </div>
                // <PaginatorComponent />

                // </>
            // )
        }

        
        </>
    )
}