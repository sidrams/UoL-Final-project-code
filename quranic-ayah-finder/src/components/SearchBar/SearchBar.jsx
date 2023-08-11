import React, { useState } from "react";

import { BsUpload } from "react-icons/bs"
import SearchModal from "./SearchModal";
// import "./Searchbar.css"

// export const Searchbar = () => {
export default function Searchbar() {
    const [input, setInput] = useState("")
    const [guides, setGuides] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [searchedText, setSearchedText] = useState('')
    const [verseDetails, setVerseDetails] = useState()

    // const fetchData = (value) => {
    //     fetch("http://localhost:8000/api/guides/")
    //         .then((response) => response.json())
    //         .then((json) => 
    //             {setGuides(json)
    //             console.log(json)}
    //         )
    // }
    const fetchData = () => {
        let query = 'https://api.quran.com/api/v4/search?q='+ searchedText
        fetch(query)
            .then((response) => response.json())
            .then((json) => 
                {setVerseDetails(json)
                console.log("details fetched"+JSON.stringify(json))}
            )
    }

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <>
        <div className="search-bar bg-white p-2 rounded-md my-0 mx-auto flex justify-between lg:w-[32rem]">
            <input 
                className="w-2/3"
                placeholder="Enter a keywords here or upload an image..." 
                value={input} onChange={(e) => handleChange(e.target.value)}
            />
            <button 
                className="flex"
                onClick={() => setShowModal(true)}
            >
                <BsUpload />Upload image
                
            </button>
            {showModal ? (
                <>
               <SearchModal setShowModal={setShowModal} searchedText={searchedText} setSearchedText={setSearchedText} />
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
        {/* <div>
        {!guides || guides.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>No guides available</b>
              </td>
            </tr>
          ) : (
            guides.map(guide => (
              <tr key={guide.pk}>
                <td>{guide.name}</td>
                <td>{guide.description}</td>
              </tr>
            ))
          )}
        </div> */}
        <div>
            {!searchedText || searchedText.length <= 0 ? (
                <tr>
                <td colSpan="6" align="center">
                    <b>No searched text</b>
                </td>
                </tr>
            ) : (
                <>
                <div>text identified is : {searchedText}</div>
                <button onClick={() => fetchData()}>Find detailed information</button>
                </>
           )}
        </div>
        <div>
            {!verseDetails || verseDetails.length <= 0 ? (
                <div></div>
            ) : (
                <>
                <h2 className="my-6 text-xl font-bold">Verses search result</h2>
                { 
                    verseDetails.search.results.map(verse => (
                    <div key={verse.verse_key} className="mb-4">
                        Verse {verse.verse_key} - {verse.text}
                    </div>
                ))}
                
                {/* <div>{JSON.stringify(verseDetails.search.results)}</div> */}
                
                </>
           )}
        </div>
        </>
    )
}