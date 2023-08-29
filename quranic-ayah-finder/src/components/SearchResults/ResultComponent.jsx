import { Link } from "react-router-dom";

export default function ResultComponent({onClick, verse}) {
    return (
        // <h1>result component</h1>
        <Link to=''>
            <div key={verse.verse_key} onClick={onClick} className="mb-4 bg-custom-gray p-6 shadow">
                Verse {verse.verse_key} - {verse.text}
                <div className="mt-2">
                    {
                        verse.translations.map((translation,i) => (
                            <p className="text-sm text-slate-500 my-1" dangerouslySetInnerHTML={{__html: translation.text }} >
                                
                            </p> 
                        ))
                    }
                </div>
            </div>
        </Link>
    )
}