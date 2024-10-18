import {Link, useLocation} from "react-router-dom";
import ModalWindow from "../Stores/ModalWindow";


export default function CardInLeftBar({text,image,opacity, router_link}){
    const location = useLocation()

    return (
        <Link to={router_link} onClick={ModalWindow.closeWindow}>
            <div className={`border-2 rounded-2xl text-base
font-bold text-slate-600 flex flex-col items-center justify-center aspect-square transition
                            ${ location.pathname.includes(router_link) ? 'bg-slate-50 -translate-y-1 shadow-2xl' : 'bg-gray-100'}
                            `}
                >
                <img src={`/icons/${image}`} alt="" style={{opacity:opacity}} />
                <span>{text}</span>
            </div>
        </Link>
    )
}