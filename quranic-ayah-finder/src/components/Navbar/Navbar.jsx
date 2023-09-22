import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { useContext, useState } from 'react';
import { Context } from "../../Context";
import {FiMenu, FiX} from 'react-icons/fi'

export default function Navbar() {
    const { loggedUser, setLoggedUSer } = useContext(Context); // get user logged in
    const classes = { // common classnames
        'green-bg-button': "bg-[#55BDB3] text-white py-1 px-3 rounded-md flex min-w-[95px] place-content-center hover:bg-white hover:text-[#55BDB3] hover:border-[#55BDB3] hover:border-[1.5px] ",
        'white-bg-button':"bg-white text-[#55BDB3] border-[#55BDB3] border-[1.5px] py-1 px-3 rounded-md flex min-w-[95px] place-content-center hover:text-white hover:bg-[#F3F3F3] hover:border-[#55BDB3] hover:border-[1.5px]",
    }
    const [open, setOpen] = useState(false)
    return(
        <div className='p-10 max-w-[1280px] m-auto'>
        <nav className="nav rounded-xl shadow text-sm font-medium ">
            <Link to="/" className="site-title pl-2 font-normal">Visual Quranic Ayah Finder</Link>
            <FiMenu className='lg:hidden block h-6 w-6 cursor-pointer' onClick={() => setOpen(!open)} />
            <ul className={`lg:flex ${open ? 'hidden' : 'hidden'} p-0 m-0 list-none gap-4`}>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/guides">Guides</CustomLink>
                <CustomLink to="/faq">FAQs</CustomLink>
                <CustomLink to="/discussionForums">Discussion Forums</CustomLink>
                <CustomLink 
                    to={loggedUser ? "/profile/"+loggedUser.username : "/signup"} 
                    textWhite={true}
                    className={classes['green-bg-button']}
                >
                    {loggedUser ? 'Profile' : 'Sign up'}
                </CustomLink>
                <CustomLink 
                    to={loggedUser ? "/logout" : "/login" }
                    className={classes['white-bg-button']}
                >
                    {loggedUser ? 'Logout' : 'Login'}
                </CustomLink>
            </ul>
        </nav>
        <div className={`${open ? 'flex' : 'hidden'} bg-sea-green fixed w-full h-full top-0 z-[1000] left-0 `}>
            <ul className={`w-full flex flex-col  p-0 m-0 list-none gap-6 pb-8 px-2 text-xl`}>
                <div className=' w-full flex justify-end pt-4'>
                    <FiX className='h-6 w-6 text-white justify-end' onClick={() => setOpen(!open)} />
                </div>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/guides">Guides</CustomLink>
                <CustomLink to="/faq">FAQs</CustomLink>
                <CustomLink to="/discussionForums">Discussion Forums</CustomLink>
                <CustomLink 
                    to={loggedUser ? "/profile/"+loggedUser.username : "/signup"} 
                    textWhite={true}
                    className={classes['green-bg-button']}
                >
                    {loggedUser ? 'Profile' : 'Sign up'}
                </CustomLink>
                <CustomLink 
                    to={loggedUser ? "/logout" : "/login" }
                    className={classes['white-bg-button']}
                >
                    {loggedUser ? 'Logout' : 'Login'}
                </CustomLink>
            </ul>
        </div>
        </div>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    const classes = props.className

    return (
        <li className={isActive ? (props.textWhite ? classes : "active " + classes): classes}>
            <Link to={to}>{children}</Link>
        </li>
    )
}