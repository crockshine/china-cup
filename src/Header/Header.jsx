import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import ModalWindow from "../Stores/ModalWindow";

export default function Header(){
    const navigate = useNavigate(); // Хук для навигации

    const doExit = (event) => {
        Cookies.remove("loginState");
        Cookies.remove("sessionID");
        navigate('/');
    };

    return (
        <div className="Header w-screen px-20 h-32 flex ">
            <div className="flex-1  flex justify-start items-center gap-5">
                <img src="/icons/dropdown.png" alt="" className="Dropdown hidden w-5 h-5" onClick={ModalWindow.openWindow}/>
                <span className="font-semibold text-3xl text-slate-700">StudyBuddy</span>
            </div>
            <div className="flex-1 flex  justify-end items-center gap-10 font-semibold text-xl text-slate-700">
                <span className="">About Us</span>
                <span className="">News</span>
                <span className="">User Policy</span>
                <button className="" onClick={ doExit }>Exit</button>
            </div>


        </div>
    )
}