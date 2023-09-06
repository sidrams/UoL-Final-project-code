import quranVector from '../../assets/quran vector.png'
import borderEllipse from '../../assets/Ellipse.svg'
import Typewriter from './Typewriter'

export default function SearchHeader() {
    return (
        // header for main search bar
        <>
        <div className="rounded-full absolute z-[-4] -right-1/4 top-[5%] ">
            <img src={borderEllipse} alt="border design element" className="absolute logo-border" />
            <img src={quranVector} alt="vector image of a quran" className="p-[3%]"/>
        </div>
        <div className="w-full text-left text-xl text-[black]">
            SEARCH FOR A  <span><Typewriter /></span>
        </div>
        </>
    )
}