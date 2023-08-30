import { GiSpellBook, GiFruitBowl, GiButterflyFlower, GiMedicines, GiPrayerBeads } from "react-icons/gi";
import { PiHandshakeDuotone } from "react-icons/pi";
import { BsFileTextFill, BsStars } from "react-icons/bs";
import { GoLaw } from "react-icons/go";
import { FaTasks } from "react-icons/fa"
import { ImBooks } from "react-icons/im"
import { MdFastfood } from "react-icons/md"

export default function TopicIcons({topic}) {
 
    const icons = {
        'Chapters of the Qur’an':<GiSpellBook />,
        'Fruits in the Quran': <GiFruitBowl />,
        'Dealing with people in the Quran':<PiHandshakeDuotone />,
        'Flowers in the Quran':<GiButterflyFlower />,
        'Medicine in the Quran':<GiMedicines />,
        'Most repeateted words/verses in the Quran':<BsFileTextFill />,
        'Moral values, honesty and rights of people':<GoLaw />,
        "A human's role and responsibility on earth according to the Quran":<FaTasks />,
        'Miracles of the Quran':<BsStars />,
        'Holy book revelations other than the Holy Quran':<ImBooks />,
        'The blessing of food and what is Halal':<MdFastfood />,
        'Salah and Ibadah (Prayer and Worship)':<GiPrayerBeads />
    }

    console.log(icons[topic])
    return (
        icons[topic]
    )
}