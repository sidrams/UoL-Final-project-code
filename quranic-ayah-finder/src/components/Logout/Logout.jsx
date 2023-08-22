import React, { useState, useRef, useContext } from "react";
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";  
import { Navigate, redirect } from "react-router-dom";
// import fetch from 'node-fetch'  
import { Context } from "../../Context";
import Cookies from 'js-cookie';

export default function LogoutModal ({setShowLogout}) {
    const { loggedUser, setLoggedUser } = useContext(Context);
    const csrftoken = Cookies.get('csrftoken');

    // , searchedText, setSearchedText
    // const [success, setSuccess] = useState(false)
    const toastCenter = useRef(null);

    const showMessage = (event, ref, severity) => {
        const label = event
        console.log('in show message '+label)
        ref.current.show({ severity: severity, summary: "Error", detail: label, life: 3000 });
    };

    const logout = () => {
        fetch(`http://127.0.0.1:8000/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            // body: 
            // JSON.stringify(form),
        })
        // .then((response) => setLoggedUser(null))
        .then((response) =>{
        //     console.log(json)
            setLoggedUser(null)
        })
        .catch(error => {console.log(error)})
        console.log(loggedUser)
    }
    

    return (
        <>
        {/* <div className="card flex justify-center">
            <Toast ref={toastCenter} />
        </div> */}
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl font-semibold">
                    Are you sure you want to Logout?
                </h3>
                <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowDelete(false)}
                >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                    </span>
                </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto flex justify-center">
                    <button 
                        className="flex m-1 my-6"
                        onClick={() => {
                            console.log("logout button clicked")
                            // setShowLogout(false)
                            logout()
                        }}
                    >
                        Confirm
                    </button>
                    <button 
                        className="flex m-1 my-6"
                        onClick={() => {
                            console.log("cancel button clicked")
                            // setShowLogout(false)
                            history.back()
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