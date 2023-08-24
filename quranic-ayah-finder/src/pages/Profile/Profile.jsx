import { useContext } from "react"
import { Context } from "../../Context"

export default function Profile() {
    const { loggedUser, setLoggedUser } = useContext(Context)
    return (
        <>
        <h1>Profile</h1>
        <p>hi {loggedUser.username}</p>
        </>
    )
}