import React, { useState } from "react";
export const SearchModal = ({setShowModal, searchedText, setSearchedText}) => {
    const [image, setImage] = useState()

    const fetchImageText = () => {
        const uploadData = new FormData()
        uploadData.append('image', image, image.name)
        console.log(uploadData)

        fetch('http://127.0.0.1:8000/search/', {
          method: 'POST',
          body: uploadData
        })
        .then((response) => response.json())
        .then((json) =>{
            setSearchedText(json)
            console.log(json)
            console.log("searched text "+ searchedText)
        })
        .catch(error => console.log(error))
        
        
        // const body = {
        //     name :'test',
        //     description: 'testing if image uploads',
        //     image: image
        // }
        // axios.post('http://127.0.0.1:8000/api/guides/', uploadData, axiosConfig)
        // .then( res => {
        //     console.log(res.data)
        //     setSearchedText(res.data)
        //     console.log("searched text "+ searchedText)
        //     console.log("searched text type is "+ typeof(res.data))
        // })
    }

    return (
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl font-semibold">
                    Upload an image of a Verse
                </h3>
                <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                    </span>
                </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    <button 
                        className="flex mx-auto my-6"
                        onClick={() => {
                            setShowModal(false)
                            console.log("image name : "+image.name)
                            fetchImageText()
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}