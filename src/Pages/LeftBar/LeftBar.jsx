import CardInLeftBar from "./CardInLeftBar";
import Cookies from 'js-cookie';
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import './LeftBar.css'

import SecondModalWindow from "../../Stores/SecondModalWindow";
import SecondModalWindowWrapper from "../../ModalWindows/SecondModalWindowWrapper";
import {observer} from "mobx-react-lite";

function getToken() {
    return Cookies.get('token');
}

async function getUserProgressValue() {
    try {
        const token = getToken();
        const response = await fetch('/api/get_user_progress_value', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            }),
        });

        const data = await response.json();
        return data.userProgressValue;
        
    } catch (error) {
        console.log('Ошибка при получении имени пользователя:', error);
    }
};

async function getUserName() {
    try {
        const token = getToken();
        const response = await fetch('/api/get_user_name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            }),
        });

        const data = await response.json();
        return String(data.userName);
        
    } catch (error) {
        console.log('Ошибка при получении имени пользователя:', error);
    }
};

async function getUserNickName() {
    try {
        const token = getToken();
        const response = await fetch('/api/get_user_nickname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            }),
        });
        
        const data = await response.json();
        return String(data.userNickName);
    } catch (error) {
        console.log('Ошибка при получении никнейма пользователя:', error);
    }
}

async function getUserRole() {
    try {
        const token = getToken();
        const response = await fetch('/api/get_user_role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            }),
        });
        
        const data = await response.json();
        return data.userRole;
    } catch (error) {
        console.log('Ошибка при получении никнейма пользователя:', error);
    }
  };

const LeftBar = observer(()=>{
    const [userName, setUserName] = React.useState('');
    const [userNickName, setUserNickName] = React.useState('');
    const [userRole, setUserRole] = useState(-1);
    const navigate = useNavigate(); // Хук для навигации
    const location = useLocation()

    useEffect(() => {
        async function fetchData() {
            const name = await getUserName();
            setUserName(name || 'Unknown User');

            const nickName = await getUserNickName();
            setUserNickName(nickName || 'Unknown Nickname');

            const currentUserProgressValue = await getUserProgressValue();
            setProgressBar(currentUserProgressValue);

            const currentUserRole = await getUserRole();
            setUserRole(currentUserRole);
        }
        fetchData();
    }, [navigate]);

    const [x, setX] = useState()
    const [y, setY] = useState()
    const [progress, setProgress] = useState(0)//это не трогать
    const [progressBar, setProgressBar] = useState(549) //сздесь полная стата, тоесть 452 или 1233

    useEffect(()=>{
        //сброс бара и инкремент прогресса
        // ПИЗДЕЕЦ МИША, пиши лучше фронт)) у тебя бек - это пиздец
        if (progressBar >= 100) {
            // это пиздец полный
            // блять мишань, через toString это делать пздц, такая себе идея блять
            setProgressBar(progressBar -  parseInt(progressBar.toString()[0])*100);
            setProgress(parseInt(progressBar.toString()[0]));
        } else {
            // тут похуй, это я дописал
            setProgressBar(progressBar);
            setProgress(0);
        }

        setX(75 * Math.cos((((progressBar*360/100)+90) * Math.PI) / 180));
        setY(-75 * Math.sin((((progressBar*360/100)+90) * Math.PI) / 180));
    },[progressBar]);

    const InfoCardInLeftBar =[
        {id:0, text:'Dashboard', image:'dashboard.png', opacity:'1', router_link:'/dashboard'},
        {id:1, text:'Messenger', image:'messege.png', opacity:'1', router_link:'/messenger'},
        {id:2, text:'Tasks', image:'tasks.png', opacity:'1', router_link:'/tasks'},
        {id:3, text:'Profile', image:'settingsProfile.png', opacity:'1', router_link:'/profile'},
        {id:4, text:'Schedule', image:'schedules.png', opacity:'0.3', router_link:'/schedule'},
        {id:5, text:'Graduates', image:'graduation.png', opacity:'1', router_link:'/graduates'},
    ]

    return (
        <>
            {/* Переход в профиль */}
            <div className="flex w-full  items-center justify-between ">
                <Link to='/profile'><img src="/image/settingsProfile.png" alt="" className="w-10 h-10 sm:w-12 sm:h-12"/></Link>
                <div className="relative  flex flex-col items-center justify-between">
                    <img onClick={SecondModalWindow.switchWindow} src="/image/settings.png" alt=""
                         className="z-20 w-10 h-10 sm:w-12 sm:h-12"/>
                    <SecondModalWindowWrapper isOpenSecond={SecondModalWindow.isOpenSecond}/>
                </div>
            </div>

            <div className="MainInfo  flex flex-col mb-5 items-center ">
                {/* Если авы нет добавить стандартную */}

                <div className="relative  mb-5 flex justify-center items-center bg-cover"
                     style={{width: '170px', height: '170px'}}>


                    <div className="z-20 rounded-full bg-slate-100" style={{width: '122px', height: '122px'}}>
                        <img src="/image/defaultProfile.png" alt="" className=" "/>
                    </div>

                    <div className="progress absolute transition  rounded-full" style={{
                        width: '130px', height: '130px',
                        background: `conic-gradient(#cdd1d9 ${100 - progressBar}%, #3361ff ${100 - progressBar}% 100%)`
                    }}></div>

                    <div
                        className="absolute z-20 transition bg-blue-500  w-fit h-fit rounded-full font-bold text-xl text-slate-50"
                        style={{
                            paddingLeft: `20px`, paddingRight: '20px',
                            paddingTop: '5px', paddingBottom: '5px',
                            transform: `translateX(${x}px) translateY(${y}px)`,
                        }}>{progress}</div>


                </div>

                <span className="Name text-xl sm:text-2xl font-black text-slate-900">{userName}</span>
                <span className="Mail text-base sm:text-lg font-bold text-slate-500">{userNickName}</span>
            </div>

            <div className="LeftMenu w-full flex-1 flex flex-col">
                <div className="CardList w-full h-full grid gap-4">
                    {InfoCardInLeftBar.map(card => {
                        return <CardInLeftBar text={card.text} image={card.image} opacity={card.opacity}
                                              router_link={card.router_link} key={card.id}/>
                    })}

                </div>

                <div className={`w-full h-full mt-3  border-2  rounded-2xl text-base font-bold text-slate-600 transition
                ${location.pathname.includes('admin') ? 'bg-slate-50 -translate-y-1 shadow-2xl' : 'bg-gray-100'}
                ${(userRole == 5) ? "block" : "hidden"}`}>
                    <Link to={'/admin'} className={`w-full h-full flex flex-col items-center justify-center`}>
                        Admin panel

                    </Link>
                </div>
            </div>

        </>
    )
})
export default LeftBar