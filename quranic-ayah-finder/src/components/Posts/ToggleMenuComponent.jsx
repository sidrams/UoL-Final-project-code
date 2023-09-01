import { SlOptionsVertical } from "react-icons/sl";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidEditAlt } from 'react-icons/bi'
import { MdDeleteOutline } from "react-icons/md";
import BackButton from "../Buttons/BackButton";

export default function ToggleMenuComponent({post, setShowDelete}) {
    const navigate = useNavigate() // navigate to post after changes
    const [post_id, setPost_id] = useState() // set post id for post to be updated/deleted
    
    const menuRight = useRef(null); // handle toggle menu
    const items = [ // update and delete post - items to show in toggle menu
        {
            label:'',
            items: [
                {
                    label: 'Update',
                    icon: <BiSolidEditAlt />,
                    command: () => {
                        navigate("/post/update/"+post_id)
                    }
                },
                {
                    label: 'Delete',
                    icon: <MdDeleteOutline />,
                    command: () => {
                        setShowDelete(true)
                    }
                },
                
            ]
        }
    ]

    return (
        <div>
            <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
            <BackButton 
                icon={<SlOptionsVertical />} 
                customStyle="p-0 bg-transparent"
                customIconStyle="text-[1rem]"
                onClick={(e) => {setPost_id(post.pk);menuRight.current.toggle(e)} } 
                aria-controls="popup_menu_right" aria-haspopup 
            />
        </div>
    )
}