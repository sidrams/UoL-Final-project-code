import React, { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";  
import { useNavigate } from "react-router-dom";

export default function SavedVerseDeleteConfirmation({setShowDelete, search_id}) {
    const [success, setSuccess] = useState(false)
    const toastCenter = useRef(null);
    const navigate = useNavigate()

    const showMessage = (event, ref, severity) => {
        const label = event
        console.log('in show message '+label)
        ref.current.show({ severity: severity, summary: "Error", detail: label, life: 3000 });
    };

    // request to delete post
    const deletePost = async () => {
        fetch('http://127.0.0.1:8000/saveSearch/'+search_id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((json) =>{
            console.log(json)
            if (json == 'post deleted') setSuccess(true)
            window.location.reload();
            navigate('/profile/savedSearches')
        })
        .catch(error => console.log(error))
    }

    return (
        <>
        <div className="card flex justify-center">
            <Toast ref={toastCenter} />
        </div>
        <div
            className="justify-center text-gray-500 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl font-semibold">
                    Are you sure you want to delete?
                </h3>
                <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowDelete(false)}
                >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                    </span>
                </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto flex justify-center">
                    <button 
                        className="flex m-1 my-6"
                        onClick={() => {
                            console.log("delete button clicked")
                            setShowDelete(false)
                            deletePost()
                        }}
                    >
                        Confirm
                    </button>
                    <button 
                        className="flex m-1 my-6"
                        onClick={() => {
                            console.log("cancel button clicked")
                            setShowDelete(false)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}