import { Searchbar } from "../../components/SearchBar/SearchBar"

export default function Home() {
    return (
        <>
        <h1>Home</h1>
        <div className="search-bar flex flex-col items-center m-auto justify-center min-h-[80vh]">
            <Searchbar />
        </div>
        </>
    )
    
}