import { MdQuiz } from 'react-icons/md'
import { VscDebugRestart } from "react-icons/vsc";
import { BsCardHeading } from 'react-icons/bs'
import BackButton from '../Buttons/BackButton';
import { Link } from 'react-router-dom';

export default function EndGuideComponent({id, restartGuide}) {
    const customStyle = "hover:bg-medium-gray hover:text-navy-blue"

    return (
        <div className="flex flex-col justify-evenly items-center text-lg bg-[#55BDB3DD] p-6 py-8 w-[60%] m-auto rounded h-[50vh]">
            <div>
                Well Done! The Guide has now ended.
            </div>
            <div className="flex flex-col gap-4 justify-center items-center gap-4 mt-6 ">
                <div className="flex gap-4 m-auto">
                    <BackButton 
                        onClick={restartGuide} 
                        text="Restart Guide" 
                        icon={<VscDebugRestart />} 
                        customStyle={customStyle} 
                    />
                    <BackButton 
                        onClick='' 
                        text={<Link to={`/guides/topic/${id}/Quiz`} >Take the quiz</Link>} 
                        icon={<MdQuiz />} 
                        customStyle={customStyle}  
                    />
                    <BackButton 
                        onClick='' 
                        text={<Link to="/guides">Go back to topics</Link>} 
                        icon={<BsCardHeading />} customStyle={customStyle}  
                    />
                </div>
            </div>
        </div>
    )
}