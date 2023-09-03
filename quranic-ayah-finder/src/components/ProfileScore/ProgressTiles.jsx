import { MdOutlineQuestionAnswer } from 'react-icons/md'
import { RiNumbersFill, RiTimeFill,RiTrophyFill } from 'react-icons/ri'

export default function ProgressTiles({scoreData}) {
    // get average of all scores of a user
    const getAvgScore = () => {
        let scoreCount = 0
        scoreData.map((score,i) => {
            scoreCount += score.score
        })

        return scoreCount > 0 ? Math.round(scoreCount/scoreData.length) : 
            (scoreData.length == 0 ? 'NA' : 0)
    }

    // get highest of all scores of a user
    const gethighestScore = () => {
        let highestScore = 0
        scoreData.map((score,i) => {
            highestScore = score.score > highestScore ? score.score : highestScore
        })

        return highestScore
    }

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
                    <span>{scoreData.length}</span>
                </div>
                <div>
                    Quizzes Attempted
                </div>
            </div>

            {/* average of all scores of a user */}
            <div className={classes.section_styles}>
                <div className={classes.subsection_styles}>
                    <RiNumbersFill />
                    <span>{getAvgScore()}</span>
                </div>
                Average Score
            </div>
            
            {/* highest of all scores of a user */}
            <div className={classes.section_styles}>
                <div className={classes.subsection_styles}>
                    <RiTrophyFill />
                    <span>{gethighestScore()}</span>
                </div>
                Highest Score achieved
            </div>
            
            {/* last attempt of user */}
            <div className={classes.section_styles}>
                <div className={classes.subsection_styles}>
                    <RiTimeFill />
                    <span>{scoreData[0] ? new Date(scoreData[0].time_taken_at).toLocaleDateString() : 'NA'}</span>
                </div>
                Last attempt
            </div>
        </div>
    )
}