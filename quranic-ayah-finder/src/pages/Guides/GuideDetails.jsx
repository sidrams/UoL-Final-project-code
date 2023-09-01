import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import BackButton from "../../components/Buttons/BackButton";

import EndGuideComponent from "../../components/Guides/EndGuideComponent";

export default function GuideDetails() {
    const {id} = useParams() // topic id
    const [guides, setGuides] = useState([]) // get guides content
    const [currentGuide, setCurrentGuide] = useState() // current guide content showing
    const [firstGuide, setFirstGuide] = useState(true) // show the first guide content
    const [lastGuide, setLastGuide] = useState() // show the last guide content

    // get all content for the cosen topic and set the first content to be displayed
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/guideContent/topic/'+id, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((json) =>{
                setGuides(json.Guides)
                setCurrentGuide(json.Guides[0])
            })
            .catch(error => console.log(error))
    }, [])

    // show previous guide when left arrow button clicked
    const prevGuide = () => {
        const index = guides.indexOf(currentGuide);
        console.log(index)
        if(index > 0 && index < guides.length - 1) {
            setCurrentGuide(guides[index - 1])
        }
        else {
            setFirstGuide(true)
        }
    }
    
    // show next guide when left arrow button clicked
    const nextGuide = () => {
        const index = guides.indexOf(currentGuide);
        console.log(index)
        if(index >= 0 && index < guides.length - 1) {
            setCurrentGuide(guides[index + 1])
            setFirstGuide(false)
        }
        else {
            setLastGuide(true)
        }
    }

    // show the first guide if restarted
    const restartGuide = () => {
        setCurrentGuide(guides[0])
        setFirstGuide(true)
        setLastGuide(false)
    }

    return (
        <>
        {/* header section */}
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
            (   // "quiz has not ended"
                <>
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    {/* left arrow */}
                    <button onClick={prevGuide} disabled={firstGuide} className="p-2 rounded-full h-fit "> <CiCircleChevLeft size={'2.5em'} color="#55BDB3" /> </button>
                    
                    {/* main content component */}
                    <div className="whitespace-pre-line text-slate-600 bg-custom-gray p-8 shadow-md w-[70%] h-[300px] h-[50vh] overflow-auto rounded flex justify-center items-center">
                        {currentGuide.content}
                    </div>

                    {/* right arrow */}
                    <button onClick={nextGuide} className="p-2 rounded-full h-fit"> <CiCircleChevRight size={'2.5em'} color="#55BDB3"  /> </button>
                </div>
                </>
            )
            : 
            (
                // "end of quiz"
                <EndGuideComponent id={id} restartGuide={restartGuide} />
            )) : ''
        }
        </>
    )
}