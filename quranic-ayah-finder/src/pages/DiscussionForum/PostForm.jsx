import { useContext, useEffect, useState } from "react"
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../Context";
import { AiFillCloseCircle } from "react-icons/ai";
import BackButton from "../../components/Buttons/BackButton";
import { BsCheckCircle } from "react-icons/bs";

export default function PostForm () {
    const { loggedUser, setLoggedUser } = useContext(Context) // get user logged in
    let { id } = useParams() // get post id, if post is to be updated
    const [post_id, setPost_id] = useState(id ? id : '') // store id of created/updated post to show link for the same

    // form object - to be passed in a request
    const [form, setForm] = useState({ 
        title: '',
        description: '',
        user: loggedUser.id,
        verse_id: '',
    })
    const [success, setSuccess] = useState(false) // set true if post successfully added/updated
    const [update, setUpdate] = useState(false) // true if post has to be updated
    const navigate = useNavigate()

    // get post data with corresponding id and prefill the form with the data
    if (id) {
        // setPost_id(id)
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
                    setUpdate(true)
                } 
            })
            .catch(error => console.log(error))
        }, [])
    }

    // request to create a post
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
            if (json.message == 'Post added') setSuccess(true)
            setPost_id(json.post_id)
            // console.log(id)
            navigate('/post/'+json.post_id)
        })
        .catch(error => console.log(error))
    }

    // request to update a given post
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
            if (json.message == 'Post updated') setSuccess(true)
            // setPost_id(json.post_id)
            navigate('/post/'+json.post_id)
        })
        .catch(error => console.log(error))
    }

    // handle all form values
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        console.log(form)
    }

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
                success ? 
                (   // if post is added successfuly , show link to discussion forum page
                    <div className="w-[50%] min-h-[70vh] flex flex-col justify-evenly items-center m-auto mb-4 bg-medium-gray p-6 shadow-xl">
                        <p className="text-2xl font-medium tracting-wider">Success!</p>

                        <div className="flex flex-col items-center gap-2">
                            <p className="text-gray-500">Post added Successfully</p>
                            <BsCheckCircle className="text-[5rem] text-teal-500" />
                        </div>
                        
                        <Link  className="w-[25%] font-medium bg-sea-green rounded-full border-2 hover:text-sea-green p-4 text-xl text-white hover:bg-light-sea-green hover:border-sea-green" to={'/post/'+post_id}>
                            See Post
                        </Link>
                    </div>
                ) :
                (   // show form to create/update post
                    <div className="w-[50%] m-auto mb-4 bg-medium-gray p-6 shadow-xl">
                        <div className="flex justify-between items-center border-b border-solid border-slate-300 pb-4">
                            <div></div>

                            {/* header */}
                            <h2 className="text-xl font-bold">
                                {update ? 'Update Post' : 'Create post'}
                            </h2>

                            {/* link to close post form */}
                            <Link to='/discussionForums'><AiFillCloseCircle className="text-[1.5rem]"/></Link>
                        </div>

                        {/* post form  */}
                        <form method="POST" action="" className="flex flex-col text-left tracking-wide">
                            <p className="flex items-center my-2"> 
                                <label for="id_title" className="w-[20%] hidden">Title:</label> 
                                <input type="text" className="w-full shadow" name="title" placeholder={"What are you thinking about today "+loggedUser.username+'?*'} value={form.title} onChange={handleChange} maxlength="500" required id="id_title" /> 
                            </p> 
                            <p className="flex  items-center my-2"> 
                                <label for="id_description" className="w-[20%] hidden">Description:</label> 
                                <textarea name="description" className="w-full shadow" value={form.description} placeholder="   Give a little Description..." onChange={handleChange} cols="40" rows="10" id="id_description"> </textarea> 
                            </p> 
                            <p className="flex  items-center my-2 hidden"> 
                                <label for="id_verse_id" className="w-[20%]">Verse id:</label> 
                                <input type="number"  className="w-[70%] shadow" placeholder="Eg. 17:91 ..." name="verse_id" value={form.verse_id} onChange={handleChange} id="id_verse_id" /> 
                            </p>

                            {/* submit button will show either update or create accordingly */}
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