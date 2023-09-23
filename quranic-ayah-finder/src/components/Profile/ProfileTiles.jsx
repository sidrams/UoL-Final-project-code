import { MdOutlineQuestionAnswer } from 'react-icons/md'
import { RiTimeFill } from 'react-icons/ri'
import { BiSolidMessageAltEdit } from 'react-icons/bi'
import TimeDifference from '../Time/TimeDifference'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../Context'

export default function ProfileTiles({profileData}) {
    const { username } = useParams() // username of the user to view the profile 
    const { loggedUser, setLoggedUser } = useContext(Context) // get logged in user
    // common classnames
    const classes = {
        section_styles: 'flex flex-col  justify-center items-center gap-4 text-lg tracking-wider bg-medium-gray shadow p-8 xl:px-12 lg:px-6 lg:w-[23%] w-[40%]  lg:mb-0 mb-2 lg:h-auto h-[150px] hover:bg-sea-green-opacity hover:text-sea-green',
        subsection_styles: 'text-3xl flex justify-center items-center gap-4'
    }

    return (
        // profileData.progress.length > 0 &&
        // profileData.savedSearches.length > 0 &&
        // profileData.posts.length > 0 ?
        <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center lg:gap-0 gap-4 text-slate-500">
            {/* total number of quizzes attempted */}
            <div className={classes.section_styles}>
                <div className={classes.subsection_styles}>
                    <MdOutlineQuestionAnswer />
                    <span>{profileData.progress.length}</span>
                </div>
                <div>
                    Quizzes Attempted
                </div>
            </div>

            {/* last attempt of user */}
            <div className={classes.section_styles}>
                <div className={classes.subsection_styles}>
                <RiTimeFill />
                    <p className='text-2xl'>
                        {
                            loggedUser && loggedUser.username == username ?
                            profileData.savedSearches.length :
                            profileData.progress.length > 0 ? 
                            TimeDifference(profileData.progress[0].time_taken_at) + ' ago' :
                            'NA'
                        }
                    </p>
                </div>
                {(loggedUser && loggedUser.username == username) ? 'Saved Searches':'Last Attempted'}
            </div>

            {/* total number of posts shared */}
            <div className={classes.section_styles}>
                <div className={classes.subsection_styles}>
                    <BiSolidMessageAltEdit />
                    <span>{profileData.posts.length}</span>
                </div>
                Posts Shared
            </div>

            {/* time of last post shared */}
            <div className={classes.section_styles}>
                <div className={classes.subsection_styles}>
                    <RiTimeFill />
                    <p className='text-2xl'>
                        {
                            profileData.posts.length > 0 ? 
                            TimeDifference(profileData.posts[0].updated) + ' ago' :
                            'NA'
                        }
                    </p>
                    
                </div>
                Last posted
            </div>
        </div>
        //    // no data 
        // <div></div>
    )
}