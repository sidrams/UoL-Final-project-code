import borderEllipse from '../../assets/Ellipse.svg'
import { AiFillCheckCircle } from "react-icons/ai";

export default function FeatureSection() {
    const features = [
        'Quranic verse Search',
        'image search',
        'save searches',
        'discuss with learners',
        'authenticate a verse',
        'FAQs and guides'
    ]
    
    return (
        <div className="bg-custom-gray w-full flex p-[10%] pr-[13%] gap-10 items-end">
            {/* <div className=''> */}
                <div className="w-1/2 flex flex-col	text-left justify-center">
                    <p className="font-bold text-4xl text-blackish-blue">
                        <span className="text-sea-green">THE FIRST VISUAL</span>
                        <br /> QURANIC VERSE SEARCH
                    </p>
                    <p className="text-2xl uppercase my-2">
                        TO HELP YOU UNDERSTAND BETTER
                    </p>
                    <p className="text-xs mr-[25%] my-4">Lörem ipsum onas. Ivera. Prende exoment: gigad för tralig nehahusade. Parasocial platinade och tyvaling, suskade, gäv. Beseng kopimism inte teröktig.</p>
                </div>
                <div  className="w-[45%] items-end relative h-[50%]">
                    <img src={borderEllipse} alt="border design element" className=" w-[50%] absolute rotating-border top-[-20%] left-[-5%]" />
                    <div className="capitalize flex flex-wrap gap-3 bg-[white] shadow-xl p-2 py-3 justify-center items-center rounded-xl z-10 relative">
                        {
                            features.map((feature,i) => (
                                <div className="w-[47%] bg-light-sea-green flex text-[black] items-center p-2 rounded-xl text-sm z-20">
                                    <AiFillCheckCircle className="text-sea-green mr-1" /> 
                                    {feature}
                                </div>
                            ))
                        }
                    </div>
                </div>
            {/* </div> */}
        </div>

        
    )
}