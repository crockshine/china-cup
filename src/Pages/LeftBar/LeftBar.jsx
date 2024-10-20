import CardInLeftBar from "./CardInLeftBar";
import Cookies from 'js-cookie';
import {Link, useNavigate} from "react-router-dom";
import React, { useEffect } from 'react';
import './LeftBar.css'

import SecondModalWindow from "../../Stores/SecondModalWindow";
import SecondModalWindowWrapper from "../../ModalWindows/SecondModalWindowWrapper";
import {observer} from "mobx-react-lite";
const LeftBar = observer(()=>{
    const [currentToken, setToken] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userNickName, setUserNickName] = React.useState('');
    const navigate = useNavigate(); // Хук для навигации

    useEffect(() => {
        async function fetchData() {
            const name = await getUserName();
            setUserName(name || 'Unknown User');
            const nickName = await getUserNickName();
            setUserNickName(nickName || 'Unknown Nickname');
            const token = getToken();
            setToken(token);
        }
        fetchData();
    }, [navigate]);

    const InfoCardInLeftBar =[
        {id:0, text:'Dashboard', image:'dashboard.png', opacity:'1', router_link:'/home/dashboard'},
        {id:1, text:'Messenger', image:'messege.png', opacity:'1', router_link:'/home/messenger'},
        {id:2, text:'Tasks', image:'tasks.png', opacity:'1', router_link:'/home/tasks'},
        {id:3, text:'Profile', image:'settingsProfile.png', opacity:'1', router_link:'/home/profile'},
        {id:4, text:'Schedule', image:'schedules.png', opacity:'0.3', router_link:'/home/schedule'},
        {id:5, text:'Graduates', image:'graduation.png', opacity:'1', router_link:'/home/graduates'},
    ]

    function getToken() {
        return Cookies.get('token');
    }

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
    };
    return (
        <>
            {/* Переход в профиль */}
            <div className="flex w-full  items-center justify-between ">
            <Link to='/home/profile'><img  src="/icons/settingsProfile.png" alt="" className="w-10 h-10 sm:w-12 sm:h-12"/></Link>
                <div className="relative  flex flex-col items-center justify-between">
                    <img onClick={SecondModalWindow.switchWindow } src="/icons/settings.png" alt="" className="z-20 w-10 h-10 sm:w-12 sm:h-12"/>
                    <SecondModalWindowWrapper isOpenSecond={SecondModalWindow.isOpenSecond}/>
                </div>
            </div>

            <div className="MainInfo  flex flex-col mb-5 items-center ">
                {/* Если авы нет добавить стандартную */}
                <div className="w-20 h-16 sm:w-32 sm:h-32 relative rounded-full mb-5 flex justify-center items-center bg-cover">
                    <img src="/icons/defaultProfile.png" alt="" className="opacity-70"/>
                    <div className="w-28 h-28 border-4 absolute  border-amber-500 rounded-full"></div>
                </div>

                <span className="Name text-xl sm:text-2xl font-black text-slate-900">{userName}</span>
                <span className="Mail text-base sm:text-lg font-bold text-slate-500">{userNickName}</span>
            </div>



                <div className="CardList w-full h-full grid gap-4">
                    {InfoCardInLeftBar.map(card => {
                        return <CardInLeftBar text={card.text} image={card.image} opacity={card.opacity}
                                              router_link={card.router_link} key={card.id}/>
                    })}
                </div>


        </>
    )
})
export default LeftBar