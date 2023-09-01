import { MdOutlineQuestionAnswer } from 'react-icons/md'
import { RiTimeFill } from 'react-icons/ri'
import { BiSolidMessageAltEdit } from 'react-icons/bi'
import TimeDifference from '../Time/TimeDifference'

export default function ProfileTiles({profileData}) {
    // common classnames
    const classes = {
        section_styles: 'flex flex-col  justify-center items-center gap-4 text-lg tracking-wider bg-medium-gray shadow p-8 xl:px-12 lg:px-6 w-[23%] hover:bg-sea-green-opacity hover:text-sea-green',
        subsection_styles: 'text-3xl flex justify-center items-center gap-4'
    }

    return (
        <div className="flex justify-between text-slate-500">
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
                            profileData.progress.length > 0 ? 
                            TimeDifference(profileData.progress[0].time_taken_at) + ' ago' :
                            'NA'
                        }
                    </p>
                </div>
                Last Attempted
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
    )
}