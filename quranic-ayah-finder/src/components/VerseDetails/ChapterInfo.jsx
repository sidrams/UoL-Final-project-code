export default function ChapterInfo({chapter, chapterInfo, getOrdinalNum, chapterID}) {
    // chapter info of the given ayah/verse
    return (
        <>
        <h2>About {chapter.name_simple}  -  {chapter.name_arabic} (Chapter Info)</h2>
        <p className="text-sm text-slate-500 my-1" >
            The Surah {chapter.name_simple} (also known as {chapter.name_complex} or {chapter.name_arabic}) 
            is the {getOrdinalNum(chapterID)} chapter of the Holy Quran that translates as '{chapter.translated_name.name}'
            , and was revealed in <span className="capitalize"> {chapter.revelation_place}</span>. 
            This Surah contains a total of {chapter.verses_count} verses or ayaat and 
            was the {getOrdinalNum(chapter.revelation_order)} surah/chapter 
            to be revealed from the Holy Quran.
        </p>
        <p className="text-sm text-slate-500 my-1" >
            <br></br>
            {chapterInfo.short_text}
        </p>
        </>
    )
}