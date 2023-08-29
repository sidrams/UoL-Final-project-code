export default function Translations({chosenVerse}) {
    return (
        <>
        <h2>Translations</h2>
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
    )
}