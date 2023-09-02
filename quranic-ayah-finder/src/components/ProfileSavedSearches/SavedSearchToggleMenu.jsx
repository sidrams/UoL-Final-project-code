import { SlOptionsVertical } from "react-icons/sl";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidEditAlt } from 'react-icons/bi'
import { MdDeleteOutline } from "react-icons/md";
import BackButton from "../Buttons/BackButton";

export default function SavedSearchToggleMenu({search, setShowDelete}) {
    const navigate = useNavigate() // navigate to search after changes
    const [search__id, setsearch_id] = useState() // set search id for search to be updated/deleted
    
    const menuRight = useRef(null); // handle toggle menu
    const items = [ // update and delete search - items to show in toggle menu
        {
            label:'',
            items: [
                {
                    label: 'Update',
                    icon: <BiSolidEditAlt />,
                    command: () => {
                        navigate("/profile/savedSearches/update/"+search.id)
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

    console.log(search)
    return (
        <div>
            <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
            <BackButton 
                icon={<SlOptionsVertical />} 
                customStyle="p-0 bg-transparent"
                customIconStyle="text-[1rem]"
                onClick={(e) => {setsearch_id(search.id);menuRight.current.toggle(e)} } 
                aria-controls="popup_menu_right" aria-haspopup 
            />
        </div>
    )
}