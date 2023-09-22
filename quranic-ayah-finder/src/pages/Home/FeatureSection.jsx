import borderEllipse from '../../assets/Ellipse.svg'
import { AiFillCheckCircle } from "react-icons/ai";

export default function FeatureSection() {
   // Home page component listing features of the website
    const features = [
        'Quranic verse Search',
        'image search',
        'save searches',
        'discuss with learners',
        'authenticate a verse',
        'FAQs and guides'
    ]
    
    return (
        <div className="bg-custom-gray w-full flex flex-wrap lg:flex-nowrap p-[10%] pr-[13%] lg:gap-10 items-end">
                {/* left section */}
                <div className="lg:w-1/2 w-full flex flex-col lg:text-left justify-center">
                    <p className="font-bold lg:text-4xl text-xl text-blackish-blue">
                        <span className="text-sea-green">THE FIRST VISUAL</span>
                        <br className='lg:block hidden' /> QURANIC VERSE SEARCH
                    </p>
                    <p className="lg:text-2xl text-lg uppercase my-2">
                        TO HELP YOU UNDERSTAND BETTER
                    </p>
                    <p className="text-xs lg:mr-[25%] my-4">Lörem ipsum onas. Ivera. Prende exoment: gigad för tralig nehahusade. Parasocial platinade och tyvaling, suskade, gäv. Beseng kopimism inte teröktig.</p>
                </div>

                {/* right section */}
                <div  className="lg:w-[45%] w-full items-end relative h-[50%] lg:m-0 m-auto ">
                    <img src={borderEllipse} alt="border design element" className=" w-[50%] absolute rotating-border top-[-20%] left-[-5%]" />
                    <div className="capitalize flex lg:flex-row flex-col lg:flex-wrap gap-3 bg-[white] shadow-xl p-2 py-3 justify-center items-center rounded-xl z-10 relative">
                        {
                            features.map((feature,i) => (
                                <div className="lg:w-[47%] w-full bg-light-sea-green flex text-[black] items-center p-2 rounded-xl text-sm z-20 h-[40px]">
                                    <AiFillCheckCircle className="text-sea-green mr-1" /> 
                                    {feature}
                                </div>
                            ))
                        }
                    </div>
                </div>
        </div>
    )
}