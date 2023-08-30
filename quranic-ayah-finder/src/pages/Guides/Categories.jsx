import { useState } from "react"
import { Link } from "react-router-dom"
import { MdQuiz } from 'react-icons/md'
import { BsCardHeading } from 'react-icons/bs'
import BackButton from "../../components/Buttons/BackButton"


export default function Categories() {
    const categories = ['Guide','Quiz']
    const icons = [<BsCardHeading />,<MdQuiz />]
    // const [data, setData] = useState('testing passing states')
    // console.log("data is "+data)
    return (
        <>
        {/* <button onClick={() =>history.back()} className="bg-[#55BDB3] hover:text-white w-[10%] rounded-xl flex justify-center items-center">
            Go back
        </button> */}
        

        <h1 className="hidden">
            Guide Category
        </h1>
        
        <div className="flex justify-between w-[70%] m-auto">
            <BackButton onClick={() =>history.back()}  />
            <h2 className="my-6 text-2xl font-bold">
                Choose a category.
            </h2>
            <div className="w-[80px]"></div>
        </div>
        
        <p className="font-medium text-slate-500 my-1 mb-6 lg:mx-[20%]">
             Would you like to learn or test your knowledge?
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center items-center py-10">
            {/* {console.log(Array.isArray(topics))} */}
            {/* {console.log(typeof(topics))} */}
            {
                categories.map((topic,i) => (
                    // state={{ data: data }} 
                    <Link to={topic} onClick={() =>setChosenTopic(topic)} className="bg-[#55BDB3] text-slate-600 bg-custom-gray p-6 py-8 shadow-md hover:bg-medium-gray hover:text-sea-green w-[25%] h-[240px] rounded flex justify-center items-center max-w-[290px]">
                    <div key={i} >
                        {/* <Link to={topic} onClick={() =>setChosenTopic(topic)}> */}
                            <p className="text-[7rem]">{icons[i]}</p>
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