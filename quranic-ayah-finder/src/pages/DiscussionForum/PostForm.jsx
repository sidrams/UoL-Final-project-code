import { useContext, useEffect, useState } from "react"
import { Link, redirect, useParams } from "react-router-dom";
import { Context } from "../../Context";
import { BiSolidUserCircle } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import DiscussionForums from "./DiscussionForum";
export default function PostForm () {
    const { loggedUser, setLoggedUser } = useContext(Context)
    const { id } = useParams()

    const [form, setForm] = useState({
        title: '',
        description: '',
        user: loggedUser.id,
        verse_id: '',
    })
    const [success, setSuccess] = useState(false)
    const [update, setUpdate] = useState(false)

    if (id) {
        // setUpdate(true)
        useEffect(() => {
            fetch('http://127.0.0.1:8000/api/posts/'+id, {
                method: 'GET',
                })
                .then((response) => response.json())
                .then((json) =>{
                    json.post.user = json.user.id
                    json.post.username = json.user.username
                    if (json.user.username == loggedUser.username) {
                        setForm(json.post)
                        // id = null
                        setUpdate(true)
                    } 
                    // else setUpdate(true)
                    // setForm({
                    //     ...form,
                    //     user: json.post.user.username
                    // })
                    console.log(json)
                    console.log(form)
                })
                .catch(error => console.log(error))
        }, [])
    }

    const createPost = async () => {
        // setForm({
        //     ...form,
        //     user : loggedUser.id
        // })
        fetch(`http://127.0.0.1:8000/createPost`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then((response) => response.json())
        .then((json) =>{
            console.log(json)
            // redirect('/success')
            if (json == 'Post added') setSuccess(true)
        })
        .catch(error => console.log(error))
    }

    const updatePost = async () => {
        // setForm({
        //     ...form,
        //     user : loggedUser.id
        // })
        // console.log("id is "+id)
        fetch(`http://127.0.0.1:8000/updatePost/`+id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then((response) => response.json())
        .then((json) =>{
            console.log(json)
            // redirect('/success')
            if (json == 'Post updated') setSuccess(true)
        })
        .catch(error => console.log(error))
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        console.log(form)
    }

    // useEffect(() => {
    //     fetch('http://127.0.0.1:8000/createPost', {
    //         method: 'GET',
    //         })
    //         .then((response) => response.text())
    //         // .then((response) => console.text(response))
    //         .then((text) =>{
    //             setForm(text)
    //             // console.log(text)
    //         })
    //         .catch(error => console.log(error))
    // }, [])

    return (
    <>
    {
        !loggedUser ? 
        (
            <h4>Please <Link to='/login'>Login</Link> to {update ? 'update' : 'add'} posts</h4>
        ) 
        :
        (
            <div className="pb-10">
            {
                success ? (
                    <>
                    <p>Post added successfully</p>
                    <Link to='/discussionForums'>See all posts</Link>
                    </>
                ) :
                (
            //         <div key={verse.verse_key} onClick={onClick} className="mb-4 bg-custom-gray p-6 shadow">
            //     Verse {verse.verse_key} - {verse.text}
            //     <div className="mt-2">
            //         {
            //             verse.translations.map((translation,i) => (
            //                 <p className="text-sm text-slate-500 my-1" dangerouslySetInnerHTML={{__html: translation.text }} >
                                
            //                 </p> 
            //             ))
            //         }
            //     </div>
            // </div>
                    <div className="w-[50%] m-auto mb-4 bg-medium-gray p-6 shadow-xl">
                        {/* <p>current user {loggedUser.username}</p>
                        <p>post user {form.username}</p> */}
                        <div className="flex justify-between items-center border-b border-solid border-slate-300 pb-4">
                            <div></div>
                            <h2 className="text-xl font-bold">
                                Create post
                            </h2>
                            <Link to='/discussionForums'><AiFillCloseCircle className="text-[1.5rem]"/></Link>
                            
                            
                        </div>
                        {/* <p className="text-lg text-slate-500 my-1 my-6 flex items-center gap-2">
                                <BiSolidUserCircle className="text-[2rem]" />@{loggedUser.username}
                            </p>    */}
                        <form method="POST" action="" className="flex flex-col text-left tracking-wide">
                            <p className="flex items-center my-2"> 
                                <label for="id_title" className="w-[20%] hidden">Title:</label> 
                                <input type="text" className="w-full shadow" name="title" placeholder={"What are you thinking about today "+loggedUser.username+'?*'} value={form.title} onChange={handleChange} maxlength="500" required id="id_title" /> 
                            </p> 
                            <p className="flex  items-center my-2"> 
                                <label for="id_description" className="w-[20%] hidden">Description:</label> 
                                <textarea name="description" className="w-full shadow" value={form.description} placeholder="   Give a little Description..." onChange={handleChange} cols="40" rows="10" id="id_description"> </textarea> 
                            </p> 
                        {/* <p> 
                            <label for="id_user">User:</label> 
                            <select name="user" required id="id_user" value={form.user} onChange={handleChange}> 
                                <option value="" selected>---------</option> 
                                <option value="1">admin</option> 
                                <option value="2">amna</option> 
                            </select> 
                        </p>  */}
                        <p className="flex  items-center my-2 hidden"> 
                            <label for="id_verse_id" className="w-[20%]">Verse id:</label> 
                            <input type="number"  className="w-[70%] shadow" placeholder="Eg. 17:91 ..." name="verse_id" value={form.verse_id} onChange={handleChange} id="id_verse_id" /> 
                        </p>
                            {/* {(form)} */}
                            {/* <div dangerouslySetInnerHTML={{__html:form}} ></div> */}
                            <button type="submit" value="Submit" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    update ? updatePost() : createPost()
                                }} 
                                className="shadow-lg my-2 bg-sea-green hover:opacity-95"
                            >
                                {update ? 'Update Post' : 'Create Post'}
                            </button>
                        </form>
                    </div>
                )
            }
            </div>
        )
    }
        
      
    </>
    )
}