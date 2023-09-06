import BackButton from "../Buttons/BackButton";

export default function ResultHeader({verseDetails, resetSearch}) {
    // header for verse details page for the chosen verse
    return (
        <div>
            <h2 className="mt-6 text-2xl font-bold flex items-center">
                <BackButton onClick={resetSearch} />
                Verses search result for '{verseDetails.search.query}'
            </h2>
            
            <p className="text-sm font-medium text-slate-500 my-1 mb-6">
                {verseDetails.search.total_results} verses found
            </p>    
        </div>
    )
}