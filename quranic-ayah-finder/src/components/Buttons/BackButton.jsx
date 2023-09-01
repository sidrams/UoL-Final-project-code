import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { TiArrowLeftThick } from "react-icons/ti";

export default function BackButton({onClick, icon=<TiArrowLeftThick />, text='', customStyle='', customIconStyle=''}) {
    // customizable button that aligns with the theme
    return (
        <button  
            onClick={onClick} 
            className={"capitalize rounded-full text-sm font-semi-bold bg-transparent flex justify-center items-center gap-2 hover:bg-[#f3f3f366] hover:text-sea-green hover:border-transparent "
                        +customStyle}
        >
            <p className={"text-[1.5rem] font-bold "+customIconStyle}>{icon}</p>
            {text}
        </button>
    )
}