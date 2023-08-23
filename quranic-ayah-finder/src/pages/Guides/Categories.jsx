import { Link } from "react-router-dom"

export default function Categories() {
    const categories = ['Guide','Quiz']
    return (
        <>
        <button onClick={() =>history.back()} className="bg-[#55BDB3] hover:text-white w-[10%] rounded-xl flex justify-center items-center">
            Go back
        </button>

        <h1>Guide detail</h1>
        
        <div className="flex flex-wrap gap-4 justify-center items-center">
            {/* {console.log(Array.isArray(topics))} */}
            {/* {console.log(typeof(topics))} */}
            {
                categories.map((topic,i) => (
                    <Link to={topic} onClick={() =>setChosenTopic(topic)} className="bg-[#55BDB3] hover:text-white w-[30%] h-20 p-4 rounded-xl flex justify-center items-center">
                    <div key={i} >
                        {/* <Link to={topic} onClick={() =>setChosenTopic(topic)}> */}
                            {topic} 
                            {/* </Link> */}
                    </div>
                    </Link>
                ))
            }
        </div>
        </>
    )
}