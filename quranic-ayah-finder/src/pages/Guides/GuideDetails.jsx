import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

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
        <button onClick={() =>history.back()} className="bg-[#55BDB3] hover:text-white w-[10%] rounded-xl flex justify-center items-center">
            Go back
        </button>
        
        <h1>Guide detailed ppt here</h1>
        {
            currentGuide ? 
            (!lastGuide ? 
            // ("quiz has not ended") 
            (
                <>
                    <div className="whitespace-pre-line bg-[#55BDB3] p-6 py-8 lg:w-[60%] m-auto rounded-xl flex gap-2 items-center">
                        <button onClick={prevGuide} disabled={firstGuide} className="p-2 rounded-full h-fit"> <CiCircleChevLeft size={'1.5em'} color="#55BDB3" /> </button>
                        <div>
                            <p>{currentGuide.content}</p>
                        </div>
                        {/* <button onClick={nextGuide}>Next</button> */}
                        <button onClick={nextGuide} className="p-2 rounded-full h-fit"> <CiCircleChevRight size={'1.5em'} color="#55BDB3"  /> </button>
                    </div>
                    
                </>
            )
            : 
            (
                // "end of quiz"
                <div className="bg-[#55BDB3] p-6 py-8 w-[60%] m-auto rounded-xl">
                    <div>
                        Well Done! The Quiz has now ended.
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center gap-4">
                        <div>
                            Would you like to 
                        </div>
                        {
                            // !scoreSaved ? 
                            (
                                <div className="flex flex-col  gap-4 m-auto">
                                    <button onClick={restartGuide}>Restart Guide </button>
                                    <button ><Link to={`/guides/topic/${id}/Quiz`} >Take the quiz</Link></button>
                                </div>
                            )
                            // : 
                            // (
                            //     <div>Score saved</div>
                            // )
                        }
                         
                        <Link to="/guides"> <button>Go back to topics</button></Link>
                    </div>
                </div>
            )) : ''
        }
        </>
    )
}