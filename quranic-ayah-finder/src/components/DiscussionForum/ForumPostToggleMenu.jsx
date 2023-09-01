import { Menu } from "primereact/menu";
import BackButton from "../Buttons/BackButton";
import { SlOptionsVertical } from "react-icons/sl";
import { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";

export default function ForumPostToggleMenu({setPost_id, setShowDelete, post}) {
    const menuRight = useRef(null);
    const items = [
        {
            label:'',
            items: [
                {
                    label: 'Delete',
                    icon: <MdDeleteOutline />,
                    command: () => {
                        setShowDelete(true)
                    }
                }
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