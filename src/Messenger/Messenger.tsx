// @ts-ignore
import ShortMsg from "./ShortMsg.tsx";
import "./Messenger.css"
import {useState} from "react";
import FoundUserCard from "./FoundUserCard";
import { useLocation} from "react-router-dom";
import MessageList from "./MessageList";

export default function Messenger() {
    const [value, setValue] = useState('');
    const location = useLocation()
    const handleInput = (event) => {
        setValue(event.target.value);
        event.target.style.height = 'auto'; // сбрасываем высоту перед измерением
        event.target.style.height = `${event.target.scrollHeight}px`; // устанавливаем высоту в зависимости от содержимого
    };
    const handlePress = (event) => {
        if (event.key === 'Enter') {
            if (!event.shiftKey) {
                sendData()
            }

        }
    }
    const sendData = () => {
        setValue('')
    }

    const dataFoundPeople = [
        {userName:'Чувак 1', imageUrl:'/icons/defaultProfile.png'},
        {userName:'Чувак 2', imageUrl:'/icons/defaultProfile.png'},
    ]
    interface Messages{
        textInOneMsg: string,
        isSend: boolean
    }
    interface DataMsg{
        id:number,
        userName:string,
        messages: Messages[]
    }
    const dataMessage:DataMsg[] = [
        {
            id: 0,
            userName: 'Китаец первый',
            messages: [
                { textInOneMsg: 'Давай взорвем россию', isSend: false },
                { textInOneMsg: 'Все будет хорошо', isSend: true }
            ]
        },
        {
            id: 1,
            userName: 'Китаец dnjhjq',
            messages: [
                { textInOneMsg: 'Привет', isSend: false },
                { textInOneMsg: 'Как дела?', isSend: true }
            ]
        }
    ];

    return (
        <div className="Messenger h-full flex">

            <div className="Left w-1/2 relative">
                <div className="StaticInput  sticky top-0 w-full h-16 pl-4 flex items-center justify-center shadow">
                    <img src="/icons/search.png" alt="" className="w-10 h-10"/>
                    <input type="text"
                           className="w-full outline-0 h-full px-4 text-base sm:text-lg font-bold text-slate-500"
                           placeholder="Search in Messages"/>
                </div>

                <div className="Chat-list   grid-cols-1 overflow-x-hidden">

                    {dataMessage.map(item =>
                        <ShortMsg key={item.id} userName = {item.userName} lastMsg = {item.messages[0]} router_link = {item.id}/>)}
                </div>

                <div
                    className="StaticInput  absolute bottom-0 w-full  flex flex-col items-center justify-center shadow">
                    <div
                        className={`List-new-people w-full h-fit max-h-52  pt-2 bg-blue-600 rounded-t-2xl overflow-scroll overflow-x-hidden
                        ${dataFoundPeople.length !== 0 ? "block" : "hidden"}`}>

                        {dataFoundPeople.map(item =>
                            <FoundUserCard userName={item.userName} imageUrl={item.imageUrl}/>)}

                    </div>

                    <div className="w-full flex items-center h-16">
                        <img src="/icons/search.png" alt="" className="w-10 h-10"/>
                        <input type="text"
                               className="w-full outline-0 h-full px-4 text-base sm:text-lg font-bold text-slate-500"
                               placeholder="Find new people"/>
                    </div>
                </div>


            </div>

            <div className="Chat w-full h-full bg-slate-100 overflow-scroll overflow-x-hidden relative">
                <div
                    className="Nickname w-full h-12 bg-slate-50 flex items-center border-b-2 sticky top-0 justify-center text-base sm:text-lg font-bold text-slate-700">
                    {dataMessage.filter(item => item.id === parseInt(location.pathname[location.pathname.length - 1]))
                        .map(item => item.userName)}

                </div>

                <div className="w-full ">
                    {dataMessage.filter(item => item.id === parseInt(location.pathname[location.pathname.length - 1]))
                        .map(item => <MessageList key={item.id} text={item.messages}/>)}
                </div>
                <div className="Send w-full   bg-slate-50 flex absolute justify-center items-center bottom-0 ">
                    <textarea
                        value={value}
                        onInput={handleInput}
                        onKeyDown={handlePress}
                        className="w-full  max-h-40 outline-0 resize-none  p-3 text-base sm:text-lg font-bold text-slate-700"
                        placeholder="Write a message">
                    </textarea>
                    <img src="/icons/send.png" alt="" className='w-10 h-10' onClick={sendData}/>
                </div>
            </div>
        </div>
    )
}