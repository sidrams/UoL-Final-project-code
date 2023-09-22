export default function SearchButton({onClick}) {
    return (
        <button
            onClick={onClick}
            className="w-[25%] m-4 bg-blackish-blue text-[white] hover:text-blackish-blue hover:bg-[white] lg:px-1 lg:py-[1.5%] p-4 uppercase tracking-wider font-medium text-sm"
        >
            Search
        </button>
    )
}