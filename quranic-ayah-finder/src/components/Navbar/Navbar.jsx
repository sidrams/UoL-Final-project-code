import { useState } from 'react';
import {FiMenu, FiX} from 'react-icons/fi'
import NavbarLinks from './NavbarLinks';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [open, setOpen] = useState(false)
    
    return(
        <div className='lg:p-10 p-4 pb-8 max-w-[1280px] m-auto'>
        <nav className="nav rounded-xl shadow text-sm font-medium ">
            <Link to="/" className="site-title pl-2 font-normal">Visual Quranic Ayah Finder</Link>
            <FiMenu className='lg:hidden block h-6 w-6 cursor-pointer' onClick={() => setOpen(!open)} />
            <ul className={`lg:flex hidden p-0 m-0 list-none gap-4`}>
                <NavbarLinks setOpen={setOpen} />
            </ul>
        </nav>

        {/* mobile navigation menu */}
        <div className={`${open ? 'flex' : 'hidden'} bg-sea-green fixed w-full h-full top-0 z-[1000] left-0 `}>
            <ul className={`w-full flex flex-col justify-between p-0 m-0 list-none gap-6 pb-16 px-2 text-3xl`}>
                <div className=' w-full flex justify-end pt-4'>
                    <FiX className='h-10 w-10 text-white justify-end' onClick={() => setOpen(!open)} />
                </div>
                <NavbarLinks setOpen={setOpen} />
            </ul>
        </div>
        </div>
    )
}
