import { Link } from "react-router-dom"
import { VscDebugRestart } from "react-icons/vsc";
import { MdQuiz, MdOutlineQuestionAnswer } from 'react-icons/md'
import { BsCardHeading } from 'react-icons/bs'
import BackButton from "../Buttons/BackButton";

export default function EndQuizComponent({id, score, scoreSaved, restartQuiz, saveProgress}) {
    // displays options and score after quiz ends

    return (
        <div className="flex flex-col justify-evenly items-center  shadow  text-lg bg-[#55BDB3EE] p-6 py-8 w-[60%] m-auto rounded  min-h-[60vh]">
            <div>
                Well Done! The Quiz has now ended.
            </div>
            
            {/* score */}
            <div>
                You scored <span className={(score < 5 ? "text-[red]" : "text-[green]")+" font-medium"}> {score}</span> in this quiz .
            </div>
            
            {/* button options */}
            <div className="flex flex-col gap-4 justify-center items-center gap-4">
                <div>
                    Would you like to 
                </div>
                {
                    !scoreSaved ? 
                    (    
                        <div className="flex gap-4 m-auto">
                            <BackButton onClick={restartQuiz} text="Restart Quiz" icon={<VscDebugRestart />} customStyle="hover:bg-medium-gray hover:text-navy-blue" />
                            <BackButton onClick={saveProgress} text={<Link to={`/guides/topic/${id}/Quiz`} >Save my progress</Link>} icon={<MdQuiz />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                            <BackButton onClick='' text={<Link to="/guides">Go back to topics</Link>} icon={<BsCardHeading />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                        </div>
                    ): 
                    (   // after score is saved
                        <>
                        <div>Score saved</div>
                        <BackButton onClick='' text={<Link to="/profile/scores">View your progress</Link>} icon={<MdOutlineQuestionAnswer />} customStyle="hover:bg-medium-gray hover:text-navy-blue"  />
                        </>
                    )
                }
                    
            </div>
        </div>
    )
}