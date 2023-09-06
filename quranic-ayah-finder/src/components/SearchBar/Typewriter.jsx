import { useState, useEffect } from 'react';
import ReactTyped from "react-typed";

const Typewriter = () => {
    const text=["verse by uploading an image", "verse by typing a word"]
    return( 
        <span className="text-sea-green font-bold">
            {" "}
            <ReactTyped
            strings={text}
            typeSpeed={100}
            loop
            backSpeed={20}
            />
        </span>
    )
};

export default Typewriter;