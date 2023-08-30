import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GiSpellBook, GiFruitBowl, GiButterflyFlower, GiMedicines, GiPrayerBeads } from "react-icons/gi";
import { PiHandshakeDuotone } from "react-icons/pi";
import { BsFileTextFill, BsStars } from "react-icons/bs";
import { GoLaw } from "react-icons/go";
import { FaTasks } from "react-icons/fa"
import { ImBooks } from "react-icons/im"
import { MdFastfood } from "react-icons/md"


export default function Guides() {
    const [topics, setTopics] = useState([])
    const [chosenTopic, setChosenTopic] = useState()
    const icons = [<GiSpellBook />,<GiFruitBowl />,<PiHandshakeDuotone />, <GiButterflyFlower />, <GiMedicines />, <BsFileTextFill />, <GoLaw />, <FaTasks />, <BsStars />, <ImBooks />, <MdFastfood />, <GiPrayerBeads />]

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/guideTopics', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((json) =>{
            setTopics(json.Topics)
        })
        .catch(error => console.log(error))
    }, [])

    return (
        <>
        <h1 className="my-6 text-2xl font-bold">
            Guides
        </h1>
        <p className="text-sm font-medium text-slate-500 my-1 mb-6 lg:mx-[20%]">
            Explore Quranic content through one of our guides. These comprehensive guides provide with a lot of information 
            to learn and test your knowledge with the quizzes that follow.
        </p> 
        <div className="flex flex-wrap gap-6 justify-center items-center p-[5%]">
            {console.log(Array.isArray(topics))}
            {/* {console.log(typeof(topics))} */}
            {
                topics.map((topic,i) => (
                    <Link to={"topic/"+topic.id} onClick={() =>setChosenTopic(topic)}  className="bg-[#55BDB3] text-slate-600 bg-custom-gray p-6 py-8 shadow-md hover:bg-medium-gray hover:text-sea-green w-[25%] h-[240px]  rounded flex justify-center items-center  ">
                    <div key={i} className="flex flex-col justify-center items-center gap-4">
                        <p className="text-[7rem]">{icons[i]}</p>
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