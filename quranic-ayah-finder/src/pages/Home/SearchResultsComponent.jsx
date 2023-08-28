import PaginatorComponent from "./Paginator"

export default function SearchResultsComponent({searchedText, fetchData, resetSearch, verseDetails}) {
    return (
        <>
        <button onClick={resetSearch} >search again</button>
        <div>
            {searchedText != '' && searchedText.length >= 0 ? (
                <>
                <div>text identified is : {searchedText}</div>
                <button onClick={() => fetchData(searchedText)}>Find detailed information</button>
                </>
            ) : (
                ''
        )}
        </div>
        <div>
            {!verseDetails || verseDetails.length <= 0 ? (
                <div></div>
            ) : (
                <>
                <h2 className="my-6 text-xl font-bold">Verses search result for '{verseDetails.search.query}'</h2>
                <p>total results {verseDetails.search.total_results}</p>
                <p>currently showing {verseDetails.search.results.length}</p>
                <p>showing {verseDetails.search.current_page} / {verseDetails.search.total_pages}</p>
                { 
                    verseDetails.search.results.map((verse,i) => (
                    <div key={verse.verse_key} className="mb-4">
                        Verse {verse.verse_key} - {verse.text}
                    </div>
                ))}
                
                {/* <div>{JSON.stringify(verseDetails.search.results)}</div> */}
                
                </>
        )}
        </div>
        <PaginatorComponent 
            query={verseDetails.search.query}
            page={verseDetails.search.current_page} 
            total_results={verseDetails.search.total_results} 
            rows_on_page={verseDetails.search.results.length} 
            total_pages={verseDetails.search.total_pages}
            fetchData={fetchData}
        />

        </>
    )
}