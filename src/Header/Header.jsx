import Cookies from 'js-cookie';
import {Link, useNavigate} from "react-router-dom";
import ModalWindow from "../Stores/ModalWindow";
 import SecondModalWindowWrapper from "../ModalWindows/SecondModalWindowWrapper";
import SecondModalWindow from "../Stores/SecondModalWindow";

export default function Header(){
    const navigate = useNavigate(); // Хук для навигации

    const doExit = (event) => {
        Cookies.remove("loginState");
        Cookies.remove("sessionID");
        navigate('/');
    };

    return (
        <div className="Header w-full px-20 h-20 flex">
            <div className="flex-1  flex justify-start items-center gap-5">
                <img src="/image/dropdown.png" alt="" className="Dropdown hidden w-5 h-5" onClick={ModalWindow.openWindow}/>
                <span className="font-semibold text-3xl text-slate-700">StudyBuddy</span>
            </div>
            <div className="Info flex-1 flex  justify-end items-center gap-10 font-semibold text-xl text-slate-700">

                <Link to={'/home/about'}><span>About Us</span></Link>
                <Link  to={'/home/policy'}><span>User Policy</span></Link>

                <button className="" onClick={ doExit }>Exit</button>
            </div>


        </div>
    )
}