import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import BackButton from "../../components/Buttons/BackButton";
import { MdQuiz } from 'react-icons/md'
import { VscDebugRestart } from "react-icons/vsc";
import { BsCardHeading } from 'react-icons/bs'

// import 'primeicons/primeicons.css';
        

export default function GuideDetails() {
    const {id} = useParams()
    const [guides, setGuides] = useState([])
    const [currentGuide, setCurrentGuide] = useState()
    const [firstGuide, setFirstGuide] = useState(true)
    const [lastGuide, setLastGuide] = useState()

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/guideContent/topic/'+id, {
            method: 'GET',
            })
            .then((response) => response.json())
            // .then((response) => JSON.stringify(response))
            .then((json) =>{
                // console.log(Array.isArray(json.Topics))
                setGuides(json.Guides)
                setCurrentGuide(json.Guides[0])
                // console.log("object keys "+Object.keys(json))
            })
            .catch(error => console.log(error))
    }, [])

    const prevGuide = () => {
        const index = guides.indexOf(currentGuide);
        console.log(index)
        if(index > 0 && index < guides.length - 1) {
            setCurrentGuide(guides[index - 1])
            // setChosenAnswer(null)
            // setDisabled(false)
        }
        else {
            setFirstGuide(true)
        }
    }
    
    const nextGuide = () => {
        const index = guides.indexOf(currentGuide);
        console.log(index)
        if(index >= 0 && index < guides.length - 1) {
            setCurrentGuide(guides[index + 1])
            setFirstGuide(false)
            // setChosenAnswer(null)
            // setDisabled(false)
        }
        else {
            setLastGuide(true)
        }
    }

    const restartGuide = () => {
        setCurrentGuide(guides[0])
        setFirstGuide(true)
        setLastGuide(false)
    }

    console.log(currentGuide)
    return (
        <>
        {/* <button onClick={() =>history.back()} className="bg-[#55BDB3] hover:text-white w-[10%] rounded-xl flex justify-center items-center">
            Go back
        </button> */}
        <div className="flex justify-between w-[70%] m-auto">
            <div className="w-[30%] flex justify-start">
                {
                    !lastGuide && 
                    <BackButton onClick={() =>history.back()} text="Back to categories" />
                }
            </div>
            <h1 className="my-6 text-2xl font-semi">
                {currentGuide && (currentGuide.topic_id.topic_name)}
            </h1>
            <div className="w-[30%]"></div>
        </div>

        
        {
            currentGuide ? 
            (!lastGuide ? 
            // ("quiz has not ended") 
            (
                <>
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    <button onClick={prevGuide} disabled={firstGuide} className="p-2 rounded-full h-fit "> <CiCircleChevLeft size={'2.5em'} color="#55BDB3" /> </button>
                    <div className="whitespace-pre-line text-slate-600 bg-custom-gray p-8 shadow-md w-[70%] h-[300px] h-[50vh] overflow-auto rounded flex justify-center items-center">
                        {/* <div> */}
                            {currentGuide.content}
                        {/* </div> */}
                        {/* <button onClick={nextGuide}>Next</button> */}
                    </div>
                    <button onClick={nextGuide} className="p-2 rounded-full h-fit"> <CiCircleChevRight size={'2.5em'} color="#55BDB3"  /> </button>
                </div>
                    {/* <div className="flex flex-wrap gap-4 justify-center items-center py-10">
                        {
                            categories.map((topic,i) => (
                                // state={{ data: data }} 
                                <Link to={topic} onClick={() =>setChosenTopic(topic)} className="bg-[#55BDB3] text-slate-600 bg-custom-gray p-6 py-8 shadow-md hover:bg-medium-gray hover:text-sea-green w-[25%] h-[240px] rounded flex justify-center items-center">
                                <div key={i} >
                                    {/* <Link to={topic} onClick={() =>setChosenTopic(topic)}> */}
                                        {/* <p className="text-[7rem]">{icons[i]}</p> */}
                                        {/* {topic}  */}
                                        {/* </Link> 
                                </div>
                                </Link>
                            ))
                        }
                    </div> */}
                </>
            )
            : 
            (
                // "end of quiz"
                <div className="flex flex-col justify-evenly items-center text-lg bg-[#55BDB3DD] p-6 py-8 w-[60%] m-auto rounded h-[50vh]">
                    <div>
                        Well Done! The Quiz has now ended.
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center gap-4 mt-6 ">
                        {/* <div >
                            Would you like to 
                        </div> */}
                        {
                            // !scoreSaved ? 
                            (
                                <div className="flex gap-4 m-auto">
                                    {/* <button onClick={restartGuide}>Restart Guide </button> */}
                                    <BackButton onClick={restartGuide} text="Restart Guide" icon={<VscDebugRestart />} customStyle="hover:bg-medium-gray hover:text-navy-blue" />
                                    <BackButton onClick={restartGuide} text={<Link to={`/guides/topic/${id}/Quiz`} >Take the quiz</Link>} icon={<MdQuiz />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                                    <BackButton onClick={restartGuide} text={<Link to="/guides">Go back to topics</Link>} icon={<BsCardHeading />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                                    {/* <button ><Link to={`/guides/topic/${id}/Quiz`} >Take the quiz</Link></button> */}
                                </div>
                            )
                            // : 
                            // (
                            //     <div>Score saved</div>
                            // )
                        }
                         
                        {/* <Link to="/guides"> <button>Go back to topics</button></Link> */}
                    </div>
                </div>
            )) : ''
        }
        </>
    )
}