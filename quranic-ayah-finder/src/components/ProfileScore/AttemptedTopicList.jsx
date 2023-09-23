import TopicIcons from "../Icons/TopicIcons";

export default function AttemptedTopicList({getTopicsAttempted}) {
    // show all topics a user has attempted and saved progress for 
    return (
        <div className='lg:w-1/4 tracking-wide text-gray-500 font-medium  text-left px-10 mt-8'>
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