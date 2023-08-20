import { useEffect, useState } from "react"
import { Link, redirect, useParams } from "react-router-dom";

export default function PostForm () {
    const { id } = useParams()
    const [form, setForm] = useState({
        title: '',
        description: '',
        user: '',
        verse_id: '',
    })
    const [success, setSuccess] = useState(false)
    // const [update, setUpdate] = useState(false)

    if (id) {
        // setUpdate(true)
        useEffect(() => {
            fetch('http://127.0.0.1:8000/api/posts/'+id, {
                method: 'GET',
                })
                .then((response) => response.json())
                .then((json) =>{
                    json.post.user = json.user.id
                    setForm(json.post)
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
        <div>
        {
            success ? (
                <>
                <p>Post added successfully</p>
                <Link to='/discussionForums'>See all posts</Link>
                </>
            ) :
            (
                  <div>
                    <form method="POST" action="">
                    <p> 
                        <label for="id_title">Title:</label> 
                        <input type="text" name="title" value={form.title} onChange={handleChange} maxlength="500" required id="id_title" /> 
                    </p> 
                    <p> 
                        <label for="id_description">Description:</label> 
                        <textarea name="description" value={form.description} onChange={handleChange} cols="40" rows="10" id="id_description"> </textarea> 
                    </p> 
                    <p> 
                        <label for="id_user">User:</label> 
                        <select name="user" required id="id_user" value={form.user} onChange={handleChange}> 
                            <option value="" selected>---------</option> 
                            <option value="1">admin</option> 
                            <option value="2">amna</option> 
                        </select> 
                    </p> 
                    <p> 
                        <label for="id_verse_id">Verse id:</label> 
                        <input type="number" name="verse_id" value={form.verse_id} onChange={handleChange} id="id_verse_id" /> 
                    </p>
                        {/* {(form)} */}
                        {/* <div dangerouslySetInnerHTML={{__html:form}} ></div> */}
                        <input type="submit" value="Submit" 
                            onClick={(e) => {
                                e.preventDefault();
                                id ? updatePost() : createPost()
                            }} 
                        />
                    </form>
                </div>
            )
        }
        </div>
      
        </>
    )
}