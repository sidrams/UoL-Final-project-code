import { useContext } from "react"
import { Context } from "../../Context"
import { Link } from "react-router-dom"

export default function Profile() {
    const { loggedUser, setLoggedUser } = useContext(Context)
    return (
        <>
        <h1>Profile</h1>
        <p>hi {loggedUser.username}</p>

        <div>
            see your scores <Link to="scores">here</Link>
        </div>
        </>
    )
}