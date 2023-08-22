import React, { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";  
// import fetch from 'node-fetch'  

export default function SearchModal ({setShowModal, searchedText, setSearchedText}) {
    const [image, setImage] = useState()
    const toastCenter = useRef(null);

    const showMessage = (event, ref, severity) => {
        const label = event
        console.log('in show message '+label)
        ref.current.show({ severity: severity, summary: "Error", detail: label, life: 3000 });
    };

    const fetchImageText = () => {
        if (image == undefined) 
            // image not uploaded
            showMessage('Please upload an image', toastCenter, 'error');
        else if (image.type.match("image.*") == null) 
            // image not uploaded in the correct format
            showMessage('Incorrect File Type', toastCenter, 'error');
        else {
            // image is uploaded in correct format
            console.log("in before calling api")
            setShowModal(false)
            const uploadData = new FormData()
            uploadData.append('image', image, image.name)
            console.log(image)

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
        }
        
        
        
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
        <>
        <div className="card flex justify-center">
            <Toast ref={toastCenter} />
        </div>
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
                    <input type="file" aria-label="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    <button 
                        className="flex mx-auto my-6"
                        onClick={() => {
                            console.log("search button clicked")
                            fetchImageText()
                            // console.log("image name : "+image)
                            // if (image == undefined) 
                            //     showMessage('Please upload an image', toastCenter, 'error');
                            // else if (image.type.match("image.*") == null) 
                            //     showMessage('Incorrect File Type', toastCenter, 'error');
                            // else (
                            //     // fetchImageText()
                            //     // console.log("passed")
                            //     setShowModal(false)
                            // )
                            
                            // console.log("iamge type is" +image.type.match("image.*"))
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}