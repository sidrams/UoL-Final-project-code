export default function ImageResultHeader({searchedText, onClick, exactMatch, setExactMatch}) {
    const handleChange = () => {
        setExactMatch(!exactMatch);
    };

    return (
        <>
        <div className="mb-4 text-center text-3xl p-6">
            Text identified : {searchedText}
        </div>

        <div className="flex flex-col justify-center items-center ">
            {/* option to make results exact match the keyword */}
            <div className="mb-4 text-slate-600">
                <label>
                    <input type="checkbox" checked={exactMatch} onChange={handleChange} className="mr-2 my-auto"/> 
                    Exact Match?
                </label>
            </div>

            {/* fetch the relevant verses search results */}
            <button className="capitalize" onClick={onClick}>Find detailed information</button>
        </div>
        </>
    )
}