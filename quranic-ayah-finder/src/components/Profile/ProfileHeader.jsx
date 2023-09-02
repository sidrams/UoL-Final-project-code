import { Link, useParams } from "react-router-dom";
import BackButton from "../Buttons/BackButton";
import { RiNumbersFill } from "react-icons/ri";
import { useContext } from "react";
import { Context } from "../../Context";
import { BsBookmarkFill } from "react-icons/bs";

export default function ProfileHeader() {
    const { username } = useParams()
    const { loggedUser, setLoggedUser } = useContext(Context)
    
    // username of user and link to user progress page ----------
    return (
        <div className="flex justify-between">
            <div className='flex flex-col justify-between items-start tracking-wide w-2/3'>
                <h1 className="text-2xl font-semi text-left cap">
                    {loggedUser.username == username ? 'Your Profile' : ('@'+ username + "'s Profile")}
                </h1>
                <p className="text-sea-green text-lg mt-3">
                    {loggedUser.username !=  username && 'You are '}Logged in as  
                    {/* username */}
                    <span className="font-bold">
                        {" @" +loggedUser.username}
                    </span>
                </p>
            </div>

            {/* link to profile scores page */}
            <Link to="/profile/scores"><BackButton text="View All scores" icon={<RiNumbersFill />}/></Link>

            {/* link to saved searches page, only logged in users can see their own searches */}
            {loggedUser.username == username && <Link to="/profile/savedSearches"><BackButton text="Saved Searches" icon={<BsBookmarkFill />}/></Link>}
        </div>
    )
}