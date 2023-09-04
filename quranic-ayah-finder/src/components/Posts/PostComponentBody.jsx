export default function PostComponentBody({post}) {
    // contents of a post
    return (
        <div className="mb-6 flex flex-col items-start">
            <p className="uppercase text-gray-400 tracking-wider font-medium text-sm">post</p>
            {
                post && 
                (
                    <>
                    <h1 className=" text-2xl font-bold"> {post.title} </h1>
                    <p className="whitespace-pre-line my-4 text-mid-gray"> {post.description} </p>
                    {
                        post.image && 
                        <img src={post.image} alt={post.title} />
                    }
                    </>
                )
            }
        </div>
    )
}