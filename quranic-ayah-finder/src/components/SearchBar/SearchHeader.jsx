import quranVector from '../../assets/quran vector.png'
import borderEllipse from '../../assets/Ellipse.svg'
import Typewriter from './Typewriter'

export default function SearchHeader() {
    return (
        // header for main search bar
        <>
        <div className="rounded-full absolute z-[-4] lg:-right-1/4 right-[35%] lg:top-[5%] top-[0%] lg:max-w-[350px] max-w-[200px]">
            <img src={borderEllipse} alt="border design element" className="absolute logo-border" />
            <img src={quranVector} alt="vector image of a quran" className="p-[3%]"/>
        </div>
        <div className="lg:w-full w-[80%] text-left text-xl text-[black] lg:m-0 mt-2">
            SEARCH FOR A <Typewriter />
        </div>
        </>
    )
}