import TopicIcons from "../Icons/TopicIcons";

export default function AttemptedTopicList({getTopicsAttempted}) {
    return (
        <div className='w-1/4 tracking-wide text-gray-500 font-medium  text-left px-10 mt-8'>
            <h4 className='uppercase'>Topics completed</h4>
            <div>
                {
                    getTopicsAttempted().map((topic,i) => (
                        <div key={i} className='my-4 flex items-center gap-2'>
                            <div className='bg-sea-green-opacity p-2 rounded-full text-[2rem]'><TopicIcons topic={topic} /> </div>
                            {topic}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}