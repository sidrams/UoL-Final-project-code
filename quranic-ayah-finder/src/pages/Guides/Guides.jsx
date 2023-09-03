import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// icons for each of the topics
import TopicIcons from "../../components/Icons/TopicIcons";


export default function Guides() {
    const [topics, setTopics] = useState([]) // store all the topics for the guides
    const [chosenTopic, setChosenTopic] = useState() // set chosen topic

    // get all the topics for the guides
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/guideTopics', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((json) =>{
            setTopics(json.Topics)
            console.log(json.Topics)
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <>
        {/* header section */}
        <div>
            <h1 className="my-6 text-2xl font-bold">
                Guides
            </h1>
            <p className="text-sm font-medium text-slate-500 my-1 mb-6 lg:mx-[20%]">
                Explore Quranic content through one of our guides. These comprehensive guides provide with a lot of information 
                to learn and test your knowledge with the quizzes that follow.
            </p> 
        </div>

        {/* display each topic with icon */}
        <div className="flex flex-wrap gap-6 justify-center items-center p-[5%]">
            {
                topics.map((topic,i) => (
                    <Link key={i} to={"topic/"+topic.id} onClick={() =>setChosenTopic(topic)}  className="text-slate-600 bg-custom-gray p-6 py-8 shadow-md hover:bg-medium-gray hover:text-sea-green w-[25%] h-[240px]  rounded flex justify-center items-center  ">
                        <div key={i} className="flex flex-col justify-center items-center gap-4">
                            <p className="text-[7rem]">{<TopicIcons topic={topic.topic_name} />}</p>
                            {topic.topic_name} 
                        </div>
                    </Link>
                ))
            }
        </div>
        </>
    )
}