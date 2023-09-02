import { useContext, useEffect, useRef, useState } from "react"
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../Context";
import { AiFillCloseCircle } from "react-icons/ai";
import Cookies from "js-cookie";
import { Toast } from 'primereact/toast';

export default function PostForm () {
    const { loggedUser, setLoggedUser } = useContext(Context) // get user logged in
    let { id } = useParams() // get post id, if post is to be updated
    const csrftoken = Cookies.get('csrftoken'); // for making requests to API
    const [uploadNewImg, setUploadNewImg] = useState(false)
    // form object - to be passed in a request
    const [form, setForm] = useState({ 
        title: '',
        description: '',
        user: loggedUser.id,
        verse_id: '',
        image: null
    })
    const [update, setUpdate] = useState(false) // true if post has to be updated
    const navigate = useNavigate()

    // show any errors in file handling
    const toastCenter = useRef(null); 
    const showMessage = (event, ref, severity) => {
        const label = event
        console.log('in show message '+label)
        ref.current.show({ severity: severity, summary: "Error", detail: label, life: 3000 });
    };

    // get post data with corresponding id and prefill the form with the data
    if (id) {
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
                console.log(json.post)
            })
            .catch(error => console.log(error))
        }, [])
    }

    // handle and format all form data pass with API requests
    const handleFormData = () => {
        // create form data 
        let form_data = new FormData();
        // pass other parts of the form
        form.title && form_data.append('title', form.title);
        form.description && form_data.append('description', form.description);
        form.verse_id && form_data.append('verse_id', form.verse_id);
        
        // pass the user
        // update && 
        form_data.append('user', form.user);
        
        if (image.type.match("image.*") == null) {
            // image not uploaded in the correct format
            showMessage('Incorrect File Type. Please upload an image', toastCenter, 'error');
            return
        }
        else {
            // upload image if a new image is uploaded
            (uploadNewImg || !update) && form_data.append('image', form.image, form.image.name);
        }
        console.log(form_data)
        // update ? updatePost(form_data) : createPost(form_data)
    }


    // request to create a post
    const createPost = async (form_data) => {
        fetch(`http://127.0.0.1:8000/createPost`, {
            method: "POST",
            headers: {
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            body: form_data
        })
        .then((response) => response.json())
        .then((json) =>{
            console.log(json)
            navigate('/post/'+(json.post_id ? json.post_id : json.pk))
        })
        .catch(error => console.log(error))
    }

    // request to update a given post
    const updatePost = async (form_data) => {
        fetch(`http://127.0.0.1:8000/updatePost/`+id, {
                method: "POST",
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                credentials: 'include',
                body: form_data
            })
            .then((response) => response.json())
            .then((json) =>{
                console.log(json)
                navigate('/post/'+(json.post_id ? json.post_id : json.pk))
            })
            .catch(error => console.log(error))
    }

    // handle all form values
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    // handle image files
    const handleImageChange = (e) => {
        setForm({
            ...form,
            image : e.target.files[0]
        })
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
                <Toast ref={toastCenter} />

                {/*  show form to create/update post */}
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

                        <p>
                            {/* if new post or image to be updated */}
                            <label for="image" className="w-[20%]">Image :</label> 
                            {(!update || uploadNewImg) && <input type="file"
                                id="image" 
                                accept="image/*"  onChange={handleImageChange} />
                            }
                            {
                                // if post is being updated, ask the user if they want to update image
                                // and set 'uploadNewImg' accordingly
                                form.image && !uploadNewImg && update &&
                                <div className="flex flex-col items-center  ">
                                    <p>{(form.image.substring(form.image.lastIndexOf('/')+1) + ' currently uploaded')}</p>
                                    <button onClick={() => setUploadNewImg(true)}>Choose Another</button>
                                </div>
                            }
                        </p>

                        {/* submit button will show either update or create accordingly */}
                        <button type="submit" value="Submit" 
                            onClick={(e) => {
                                e.preventDefault();
                                // update ? updatePost() : createPost()
                                handleFormData()
                            }} 
                            className="shadow-lg my-2 bg-sea-green hover:opacity-95"
                        >
                            {update ? 'Update Post' : 'Create Post'}
                        </button>
                    </form>
                </div>
            </div>
        )
    }
    </>
    )
}