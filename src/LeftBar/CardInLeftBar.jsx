import {Link, useLocation} from "react-router-dom";
import ModalWindow from "../Stores/ModalWindow";
import './LeftBar.css'
import {useEffect, useState} from "react";

export default function CardInLeftBar({text,image,opacity, router_link}){

    const location = useLocation()
    const [windowHeight, setWindowHeight] = useState(window.innerHeight); // Инициализация с текущей высотой окна
    const [isHidden, setIsHidden] = useState(false); // Инициализация с текущей высотой окна

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight); // Обновление высоты окна
        };

        window.addEventListener('resize', handleResize); // Добавление обработчика события

        // Вызов функции при монтировании, чтобы установить начальное значение
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize); // Удаление обработчика при размонтировании
        };
    }, []);

    useEffect(() => {
        if (windowHeight <= 790 ){
                setIsHidden(true)
        }else {
            setIsHidden(false)

        }
    }, [windowHeight]);

    return (
        <Link  className={`CardInLeftBar ${isHidden && router_link !== location.pathname ? "" : "order-6"}`} to={router_link}
              onClick={ModalWindow.closeWindow}>

            <div  className={`${isHidden && router_link !== location.pathname ? "p-0 " : "p-4 " } border-2  rounded-2xl text-base font-bold text-slate-600 flex flex-col items-center justify-center h-full  transition 
                            
            ${location.pathname.includes(router_link) ? 'bg-slate-50 -translate-y-1 shadow-2xl' : 'bg-gray-100'}`}
                  >
                <img src={`/icons/${image}`} alt="" style={{opacity: opacity}}/>
                <span className={`${isHidden  && router_link !== location.pathname ? " hidden" : "block"}`}>{text}</span>
            </div>

        </Link>
    )
}