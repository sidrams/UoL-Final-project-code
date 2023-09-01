import { useState } from "react"
import { Link } from "react-router-dom"

export default function BackgroundInfo({chapter, chapterInfo}) {
    // detailed chapter background info of the given ayah/verse
    const [readMore, setReadMore] = useState(false) // cut text if too long, show only when prompted

    return (
        <>
        <h2>Background about {chapter.name_simple}  -  {chapter.name_arabic}</h2>
        <div className="chapter-bg-info gap-2 text-sm text-slate-500 my-1" 
            dangerouslySetInnerHTML={{__html: readMore ? chapterInfo.text : chapterInfo.text.slice(0,2000) }} 
        >
        </div>

        {
            chapterInfo.text.length > 2000 && 
            (
                <Link onClick={() =>setReadMore(!readMore)} className="chapter-bg-info gap-2 text-sm text-slate-500 my-1">
                    {readMore ? ('Show less'): ('Read more...')}
                </Link>
            )
        }
        
        {/* source of the information */}
        <p className="chapter-bg-info gap-2 text-sm text-slate-400 mt-6 text-xs ">
            Source: {chapterInfo.source}
        </p>
        </>
    )
}