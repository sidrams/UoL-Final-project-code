import { useParams } from "react-router-dom"

export default function GuideDetails() {
    const {id} = useParams()
    console.log(id)
    return (
        <>
        <button onClick={() =>history.back()} className="bg-[#55BDB3] hover:text-white w-[10%] rounded-xl flex justify-center items-center">
            Go back
        </button>
        
        <h1>Guide detailed ppt here</h1>
        </>
    )
}