import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function PostDetails() {
    const { id } = useParams()
    const [post, setPost] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts/'+id, {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((json) =>{
                setPost(json)
                console.log(json)
            })
            .catch(error => console.log(error))
    }, [])

    return(
        <>
        <h1>post details</h1>
        <p>{id}</p>
        <p>{post.title}</p>
        <p>{post.description}</p>
        </>
    )
}