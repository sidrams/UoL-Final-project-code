import { useContext } from "react";
import { Context } from "../../Context";
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export default function NavbarLinks({setOpen}) {
    const { loggedUser, setLoggedUSer } = useContext(Context); // get user logged in
    const classes = { // common classnames
        'green-bg-button': "bg-[#55BDB3] text-white py-1 px-3 rounded-md flex min-w-[95px] place-content-center hover:bg-white hover:text-[#55BDB3] hover:border-[#55BDB3] hover:border-[1.5px] ",
        'white-bg-button':"bg-white text-[#55BDB3] border-[#55BDB3] border-[1.5px] py-1 px-3 rounded-md flex min-w-[95px] place-content-center hover:text-white hover:bg-[#F3F3F3] hover:border-[#55BDB3] hover:border-[1.5px]",
    }

    return (
        <>
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
        </>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    const classes = props.className

    return (
        <li className={isActive ? (props.textWhite ? classes : "active " + classes): classes}>
            <Link to={to} onClick={() => setOpen(false)}>{children}</Link>
        </li>
    )
}