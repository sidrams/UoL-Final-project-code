import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { useContext, useState } from 'react';
import { Context } from "../../Context";
import LogoutModal from '../Logout/Logout';

export default function Navbar() {
    const { loggedUser, setLoggedUSer } = useContext(Context);
    const [showLogout, setShowLogout] = useState(false)

    return(
        <div className='p-10 max-w-[1280px] m-auto'>
        <nav className="nav rounded-xl shadow text-sm font-medium">
            <Link to="/" className="site-title pl-2 font-normal">Visual Quranic Ayah Finder</Link>
            <ul>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/guides">Guides</CustomLink>
                <CustomLink to="/faq">FAQs</CustomLink>
                <CustomLink to="/discussionForums">Discussion Forums</CustomLink>
                {
                    loggedUser ? 
                    <>
                    <CustomLink to={"/profile/"+loggedUser.username} textWhite={true}
                        className="bg-[#55BDB3] text-white py-1 px-3 rounded-md flex min-w-[95px] place-content-center
                                    hover:bg-white hover:text-[#55BDB3] hover:border-[#55BDB3] hover:border-[1.5px] "
                    >
                        Profile
                    </CustomLink>
                    <CustomLink to="/logout"
                        className="bg-white text-[#55BDB3] border-[#55BDB3] border-[1.5px] py-1 px-3 rounded-md flex min-w-[95px] place-content-center
                                    hover:text-white hover:bg-[#F3F3F3] hover:border-[#55BDB3] hover:border-[1.5px]"
                    >
                        Logout
                    </CustomLink>
                    </>
                    :
                    <>
                    <CustomLink to="/signup"  textWhite={true}
                        className="bg-[#55BDB3] text-white py-1 px-3 rounded-md flex min-w-[95px] place-content-center
                                    hover:bg-white hover:text-[#55BDB3] hover:border-[#55BDB3] hover:border-[1.5px]"
                    >
                        Sign up
                    </CustomLink>
                    <CustomLink to="/login" 
                        className="bg-white text-[#55BDB3] border-[#55BDB3] border-[1.5px] py-1 px-3 rounded-md flex min-w-[95px] place-content-center
                                    hover:text-white hover:bg-[#F3F3F3] hover:border-[#55BDB3] hover:border-[1.5px]"
                    >
                            Login
                    </CustomLink>
                    </>
                }
               
            </ul>
        </nav>
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