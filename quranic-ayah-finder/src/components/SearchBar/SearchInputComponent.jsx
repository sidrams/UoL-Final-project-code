import { useEffect, useRef } from "react";
import { BsUpload } from "react-icons/bs"

export default function SearchInputComponent({textInput, onChange, setShowModal, setTextInput, fetchData, showResults}) {
    const ref = useRef(null);

    useEffect(() => {
        // proceed to fetch results when enter key pressed
        if(!showResults) {
            const handleClick = event => {
                if (event.keyCode === 13 || event.key === 'Enter') {
                    setTextInput(event.target.value)
                    fetchData(event.target.value)
                    console.log(textInput)
                }
            };
    
            const element = ref.current;
            element.addEventListener('keypress', handleClick);
            return () => {
                element.removeEventListener('keypress', handleClick);
            };
        }
    }, []);

    return (
        <>
        <input 
            className="w-2/3"
            placeholder="Enter a keywords here or upload an image..." 
            value={textInput} 
            onChange={onChange}
            ref={ref}
        />
        <button 
            className="flex gap-2 items-center justify-center"
            onClick={() => setShowModal(true)}
        >
            <div><BsUpload /></div>
            <div>Upload image</div>
            
        </button>
        </>
    )
}