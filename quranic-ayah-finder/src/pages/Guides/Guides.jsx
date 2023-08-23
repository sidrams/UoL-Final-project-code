import { useEffect, useState } from "react"
import { Link, Outlet, Route, Routes } from "react-router-dom"
import GuideDetails from "./Categories"

export default function Guides() {
    const [topics, setTopics] = useState([])
    const [chosenTopic, setChosenTopic] = useState()

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/guideTopics', {
            method: 'GET',
            })
            .then((response) => response.json())
            // .then((response) => JSON.stringify(response))
            .then((json) =>{
                // console.log(Array.isArray(json.Topics))
                setTopics(json.Topics)
                // console.log("object keys "+Object.keys(json))
            })
            .catch(error => console.log(error))
    }, [])
    // Quizzes for web application UoL
    // Chapters of the Qur’an
    // Fruits in the Quran
    // Treating people in the Quran
    // Flowers in the Quran
    // Medicine in the Quran 
    // Most repeateted words/verses in the Quran
    // Moral values /honesty/peoples right
    // Humans role on earth
    // Miracles of the Quran 
    // Other holy book revelations 
    // Halal food
    // Salah
    return (
        <>
        <h1>Guides</h1>
        {/* {
            !chosenTopic
        } */}
        <div className="flex flex-wrap gap-4 justify-center items-center">
            {console.log(Array.isArray(topics))}
            {/* {console.log(typeof(topics))} */}
            {
                topics.map((topic,i) => (
                    <Link to={"topic/"+topic.id} onClick={() =>setChosenTopic(topic)}  className="bg-[#55BDB3] hover:text-white w-[30%] h-20 p-4 rounded-xl flex justify-center items-center">
                    <div key={i}>
                        {topic.topic_name} 
                    </div>
                    </Link>
                ))
            }
        </div>
        {/* <Routes> */}
        {/* </Routes> */}
        {/* <Outlet /> */}
        </>
    )
}