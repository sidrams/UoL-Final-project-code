export default function ResultHeader({verseDetails}) {
    return (
        <div>
            <h2 className="mt-6 text-2xl font-bold">
                Verses search result for '{verseDetails.search.query}'
            </h2>
            
            <p className="text-sm font-medium text-slate-500 my-1 mb-6">
                {verseDetails.search.total_results} verses found
            </p>    
        </div>
    )
}