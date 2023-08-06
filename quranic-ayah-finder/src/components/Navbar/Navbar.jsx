import { Link, useMatch, useResolvedPath } from 'react-router-dom'
export default function Navbar() {
    return(
        <nav className="nav">
            <Link to="/" className="site-title">Visual Quranic Ayah Finder</Link>
            <ul>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/guides">Guides</CustomLink>
                <CustomLink to="/faq">FAQs</CustomLink>
                <CustomLink to="/discussionForums">Discussion Forums</CustomLink>
                <CustomLink to="/signup">Sign up</CustomLink>
                <CustomLink to="/login">Login</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to}>{children}</Link>
        </li>
    )
}