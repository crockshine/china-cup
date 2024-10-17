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
        // {userName:'Чувак 1', imageUrl:'/icons/defaultProfile.png'},
        // {userName:'Чувак 2', imageUrl:'/icons/defaultProfile.png'},
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
                { textInOneMsg: 'Все будет хорошо', isSend: true },
                /*{ textInOneMsg: 'Все будет хорошо', isSend: true },
                { textInOneMsg: 'Все будет хорошо', isSend: true },
                { textInOneMsg: 'Все будет хорошо', isSend: true }, 
                { textInOneMsg: 'Все будет хорошо', isSend: true },
                { textInOneMsg: 'Все будет хорошо', isSend: true }, 
                { textInOneMsg: 'Все будет хорошо', isSend: true },
                { textInOneMsg: 'Все будет хорошо', isSend: true }, 
                { textInOneMsg: 'Все будет хорошо', isSend: true },
                { textInOneMsg: 'Все будет хорошо', isSend: true },*/

            ]
        }
    ];

    return (
        <div className="Messenger h-full relative flex">

            <div className={`Left-block flex flex-col justify-between h-full  relative ${location.pathname === '/home/messenger' ? "w-full" : " w-1/3"}`}>
                <div className="StaticInputTop z-20 w-full h-16 pl-4 flex items-center justify-center bg-slate-50">
                        <img src="/icons/search.png" alt="" className="w-8 h-8"/>
                        <input type="text"
                               className="w-full outline-0 h-full px-4 text-base sm:text-lg font-bold text-slate-500"
                               placeholder="Search in Messages"/>
                </div>


                    <div className="Short-chat-list flex flex-col overflow-scroll overflow-x-hidden h-full grid-cols-1 ">

                            {dataMessage.map(item =>
                                <ShortMsg key={item.id} userName={item.userName} lastMsg={item.messages[0]}
                                          router_link={item.id}/>)}
                    </div>

                <div className="StaticInputBottom  bottom-0 w-full h-fit  flex flex-col items-center justify-center bg-slate-50">
                        <div
                            className={`List-new-people w-full h-fit max-h-52  pt-2 bg-blue-600 rounded-t-2xl z-20 overflow-scroll overflow-x-hidden
                            ${dataFoundPeople.length !== 0 ? "block" : "hidden"}`}>

                            {dataFoundPeople.map(item =>
                                <FoundUserCard userName={item.userName} imageUrl={item.imageUrl}/>)}

                        </div>

                        <div className="w-full flex items-center pl-4 h-16">
                            <img src="/icons/search.png" alt="" className="w-10 h-10"/>
                            <input type="text"
                                   className="w-full outline-0 h-full px-4 text-base sm:text-lg font-bold text-slate-500"
                                   placeholder="Find new people"/>
                        </div>
                </div>


            </div>

            <div
                className={`Chat w-2/3 flex flex-col justify-between h-full relative bg-slate-100  ${location.pathname === '/home/messenger' ? "hidden" : "block"}`}>
                <div
                    className="Nickname w-full z-20 font-bold text-slate-700  w-full  pl-4 flex items-center justify-center bg-slate-50">
                    {dataMessage.filter(item => item.id === parseInt(location.pathname[location.pathname.length - 1]))
                        .map(item => item.userName)}

                </div>

                    <div className="h-full  flex flex-col overflow-scroll overflow-x-hidden h-full grid-cols-1 ">
                        {dataMessage.filter(item => item.id === parseInt(location.pathname[location.pathname.length - 1]))
                            .map(item => <MessageList key={item.id} text={item.messages}/>)}
                    </div>

                <div className="Send w-full h-fit  flex  items-center justify-center bg-slate-50">
                    <textarea
                        value={value}
                        onInput={handleInput}
                        onKeyDown={handlePress}
                        className="Textarea w-full flex   max-h-40 h-16 outline-0 resize-none  p-3 text-base sm:text-lg font-bold text-slate-700"
                        placeholder="Write a message"
                        >
                    </textarea>
                    <img src="/icons/send.png" alt="" className='w-10 h-10' onClick={sendData}/>
                </div>

            </div>


        </div>
    )
}