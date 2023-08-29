import React, { useState } from "react";
import SearchHeader from "./SearchHeader";
import SearchInputComponent from "./SearchInputComponent";
import SearchButton from "./SearchButton";
import SearchModal from "./SearchModal";

export default function Searchbar({showResults, setShowResults, searchedText, fetchData, setSearchedText}) {
    const [textInput, setTextInput] = useState('')
    const [showModal, setShowModal] = useState(false)
    
    // handle text change in search bar
    const handleChange = (value) => {
        setTextInput(value)
    }

    return (
        <>
        <SearchHeader />
        <div className="search-bar bg-[white] p-2 rounded-md my-0 mx-auto flex justify-between lg:w-full">
            <SearchInputComponent 
                textInput={textInput} 
                onChange={(e) => {handleChange(e.target.value)}} 
                setShowModal={setShowModal} 
                setTextInput={setTextInput} 
                fetchData={fetchData} 
                showResults={showResults}
            />

            {showModal ? //show modal when a user chooses to upload an image
                (
                    <>
                    <SearchModal 
                        setShowResults={setShowResults}
                        setShowModal={setShowModal} 
                        searchedText={searchedText} 
                        setSearchedText={setSearchedText} 
                    />
                    </>
                ) : null
            }
        </div>

        <SearchButton onClick={() => fetchData(textInput)} />
        </>
    )
}