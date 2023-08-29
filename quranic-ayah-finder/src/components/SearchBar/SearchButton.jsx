export default function SearchButton({onClick}) {
    return (
        <button
            onClick={onClick}
            className="w-[25%] m-4 bg-blackish-blue text-[white] hover:text-blackish-blue hover:bg-[white] px-1 py-[1.5%] uppercase tracking-wider font-medium text-sm"
        >
            Search
        </button>
    )
}