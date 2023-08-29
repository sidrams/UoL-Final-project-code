export default function Tafsir({tafsir}) {
    return (
        <>
        <h2>Tafsir</h2>
        <p className="text-sm text-slate-500 my-1" >
            {tafsir.text}  
            <span className="text-slate-400"> ({tafsir.tafseer_name})</span>
        </p>
        </>
    )
}