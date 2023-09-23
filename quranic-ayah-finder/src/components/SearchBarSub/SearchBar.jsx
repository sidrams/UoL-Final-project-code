import { BiSearchAlt2 } from "react-icons/bi";

export default function SearchBar({handleChange, placeholder="Search posts..."}) {
    // search bar to search posts
    return (
        <form method="GET" action="" className="lg:w-[40%] w-[90%] flex items-center gap-1">
            <BiSearchAlt2 className="text-[1.5rem] text-sea-green" />
            <input type="text" className='w-full shadow' name="q" placeholder={placeholder} onChange={handleChange} />
        </form>
    )
}