import { MdOutlineQuestionAnswer } from 'react-icons/md'
import { RiNumbersFill, RiTimeFill,RiTrophyFill } from 'react-icons/ri'
import { BiSolidMessageAltEdit } from 'react-icons/bi'
import TimeDifference from '../Time/TimeDifference'
export default function ProfileTiles({profileData}) {
    const getAvgScore = () => {
        let scoreCount = 0
        // scoreData.map((score,i) => {
        //     scoreCount += score.score
        // })

        // return scoreCount > 0 ? Math.round(scoreCount/scoreData.length) : 'NA'
        return 0
    }

    const gethighestScore = () => {
        let highestScore = 0
        // scoreData.map((score,i) => {
        //     highestScore = score.score > highestScore ? score.score : highestScore
        // })

        // return highestScore
        return 0
    }

    return (
        <div className="flex justify-between text-slate-500">
            <div className='flex flex-col justify-center items-center gap-3 text-lg tracking-wider bg-medium-gray shadow p-8 xl:px-12 lg:px-6 w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                <div className='text-3xl flex justify-center items-center gap-4'>
                    <MdOutlineQuestionAnswer />
                    <span>{profileData.progress.length}</span>
                </div>
                <div>
                    Quizzes Attempted
                </div>
            </div>
            <div className='flex flex-col  justify-center items-center gap-4 text-lg tracking-wider bg-medium-gray shadow p-8 xl:px-12 lg:px-6 w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                <div className='text-3xl flex justify-center items-center gap-4'>
                <RiTimeFill />
                    {/* <span>{scoreData[0] ? new Date(scoreData[0].time_taken_at).toLocaleDateString() : 'NA'}</span> */}
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
            <div className='flex flex-col justify-center items-center gap-4 text-lg tracking-wider bg-medium-gray shadow p-8 xl:px-12 lg:px-6  w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                <div className='text-3xl flex justify-center items-center gap-4'>
                    <BiSolidMessageAltEdit />
                    <span>{profileData.posts.length}</span>
                </div>
                Posts Shared
            </div>
            <div className='flex flex-col justify-center items-center gap-4 text-lg tracking-wider bg-medium-gray shadow p-8 xl:px-12 lg:px-6 w-[23%] hover:bg-sea-green-opacity hover:text-sea-green'>
                <div className='text-3xl flex justify-center items-center gap-4'>
                    <RiTimeFill />
                    {/* <span>{scoreData[0] ? new Date(scoreData[0].time_taken_at).toLocaleDateString() : 'NA'}</span> */}
                    <p className='text-2xl'>
                        {/* {TimeDifference(profileData.posts[0].updated)} ago */}
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