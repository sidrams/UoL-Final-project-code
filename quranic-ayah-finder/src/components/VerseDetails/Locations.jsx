export default function Locations({chosenVerse, verseID, verseByWords, chapter, getOrdinalNum}) {
    return (
        <>
        <h2>Location</h2>
        <p className="text-sm text-slate-500 my-1" >
            {chosenVerse.verse_key}
        </p> 
        <p className="text-sm text-slate-500 my-1" >
            This verse is the {getOrdinalNum(verseID)} verse in 'Surah {chapter.name_simple}' ({chapter.name_arabic}), 
            the {getOrdinalNum(verseByWords.chapter_id)} chapter of the Holy Quran.
            The verse can be found in the {getOrdinalNum(verseByWords.juz_number)} Juz and 
            in the {getOrdinalNum(verseByWords.ruku_number)} Ruku of the {getOrdinalNum(verseByWords.chapter_id)} chapter.
        </p>
        <p className="text-sm text-slate-500 my-1" >
                This verse/ayah contains a total of  {verseByWords.words.length} words.
        </p>
        </>
    )
}