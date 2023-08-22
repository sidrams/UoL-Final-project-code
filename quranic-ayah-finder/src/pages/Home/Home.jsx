import Searchbar  from "../../components/SearchBar/SearchBar"
import { useContext } from 'react';
import { Context } from "../../Context";

export default function Home() {
    const { loggedUser, setLoggedUSer } = useContext(Context);

    return (
        <>
        <h1>Home</h1>
        {
            loggedUser ? "User logged in" : "USer not logged in"
        }
        <div className="search-bar flex flex-col items-center m-auto justify-center min-h-[80vh]">
            <Searchbar />
        </div>
        </>
    )
    
}