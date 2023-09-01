export default function Translations({chosenVerse, verseByWords}) {
    // translations of the given ayah/verse
    return (
        <>
        <h2>Translations</h2>
        {   // display the translation
            chosenVerse.translations.length > 0 ? 
            (
                <>
                {
                    chosenVerse.translations.map((translation,i) => (
                        <p className="text-sm text-slate-500 my-1">
                            <span dangerouslySetInnerHTML={{__html: translation.text }} >
                            </span> 
                            <span className="text-slate-400"> ({translation.name})</span>
                        </p>
                    ))
                }
                </>
            ) :
            (
                <>
                {
                    verseByWords.translations.map((translation,i) => (
                        <p className="text-sm text-slate-500 my-1">
                            <span dangerouslySetInnerHTML={{__html: translation.text }} >
                            </span> 
                        </p>
                    ))
                }
                </>
            )
        }
        {   // display source/name of the translation displayed
            chosenVerse.translations.map((translation,i) => (
                <p className="text-sm text-slate-500 my-1">
                    <span dangerouslySetInnerHTML={{__html: translation.text }} >
                    </span> 
                    <span className="text-slate-400"> ({translation.name})</span>
                </p>
            ))
        }
        </>
    )
}