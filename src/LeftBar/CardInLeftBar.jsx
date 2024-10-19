import {Link, useLocation} from "react-router-dom";
import ModalWindow from "../Stores/ModalWindow";
import './LeftBar.css'
import {useEffect, useState} from "react";

export default function CardInLeftBar({text,image,opacity, router_link}){

    const location = useLocation()


    return (
        <Link  className={`CardInLeftBar ${router_link !== location.pathname }`} to={router_link}
              onClick={ModalWindow.closeWindow}>

            <div  className={`${ !location.pathname.includes(router_link) ? "p-0 " : "p-6 w-full" } border-2  rounded-2xl text-base font-bold text-slate-600 flex flex-col items-center justify-center h-full  transition 
                            
            ${location.pathname.includes(router_link) ? 'bg-slate-50 -translate-y-1 shadow-2xl' : 'bg-gray-100'}`}
                  >
                <img src={`/icons/${image}`} alt="" style={{opacity: opacity}}/>
                <span className={`${ !location.pathname.includes(router_link) ? " hidden" : "block"}`}>{text}</span>
            </div>

        </Link>
    )
}