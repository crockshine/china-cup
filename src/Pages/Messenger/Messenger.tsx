// @ts-ignore
import ShortMsg from "./ShortMsg.tsx";
import Cookies from 'js-cookie';
import "./Messenger.css"
import { useEffect, useState, useRef } from "react";
import FoundUserCard from "./FoundUserCard";
import { useLocation, useNavigate } from "react-router-dom";
import MessageList from "./MessageList";

export default function Messenger() {
    const [value, setValue] = useState('');
    const [currentUserID, setCurrentUserID] = useState(-1);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const [messagesData, setMessagesData] = useState([
        {
            id: 0,
            userName: '#none',
            messages: [
                { textInOneMsg: '#none', bySend: -1 },
                { textInOneMsg: '#none', bySend: -1 },

            ]
        }
    ]);
    const location = useLocation();

    const sendData = () => {
        if (value) {
            const currentSelectChatID = Number(location.pathname.split('/')[3]);
            //alert(currentSelectChatID);
            sendMessage(currentSelectChatID, currentUserID, value);
            setValue('');
            setMessagesData([]);
            fetchData();
        }
    }    

    const scrollToBottom = () => {
        if(messagesEndRef.current){
            messagesEndRef.current.scrollTo(0, messagesEndRef.current.scrollHeight);
        }
    }

    async function fetchData() {
        const userChats = await listUserChats();
        const _currentUserID = await loadCUserID();
        //console.log('userChats=', userChats, 'currentUserID=', currentUserID);
        
        let _messagesData: DataMsg[] = [];
        userChats.forEach(chatID => {
            async function invoke() {
                const _messages = await loadChatMessages(chatID);
                const users = await loadChatsUsers(chatID);
                const fromUserID = getFromUserID(_currentUserID, users);
                const fromUserName = await loadUserNameByID(fromUserID);

                // парсим сообщения
                let result_messages: Messages[] = [];
                if (_messages != undefined && _messages != null) {
                    const keys = Object.keys(_messages);

                    for (let i = 0; i < keys.length; i++) {
                        const key = keys[i];
                        const text = _messages[key]['textInOneMsg'];
                        const _bySend = _messages[key]['bySend'];

                        const _message: Messages = { textInOneMsg: text, bySend: _bySend };
                        //console.log('message', _message);
                        result_messages.push(_message);
                    }
                }

                // Новый элемент массива
                const newElement = {
                    id: chatID,
                    userName: fromUserName,
                    /*messages: [
                        { textInOneMsg: 'Привет!', bySend: -1 },
                    ],*/
                    messages: result_messages
                };
                _messagesData.push(newElement);
                
                //console.log('chat=', chatID, ', users=', users ,', from=', fromUserName);
            }
            async function myFunction() {
                invoke();
                await new Promise(resolve => setTimeout(resolve, 150));

                setMessagesData(_messagesData);
                setCurrentUserID(_currentUserID);
                setTimeout(scrollToBottom, 200);
            }
            myFunction();

            //await new Promise(resolve => setTimeout(resolve, 2000));

        });
    }

    function getFromUserID(thisUserID, users) {
        if (users[0] == thisUserID) return users[1];
        else return users[0];
    }

    const navigate = useNavigate(); // Хук для навигации
    useEffect(() => {      
        fetchData();
    }, [navigate]);

    const [isTimerActive, setIsTimerActive] = useState(true);

    let currentMessageIndex = -1;
    let currentSelectChatID = -771;
    /*useEffect(() => {
        if (!isTimerActive) return; // Если таймер не активен, ничего не делаем

        const intervalId = setInterval(() => {
            async function invoke() {
                const _currentMessageIndex = await loadCurrentMessageIndex(currentSelectChatID);

                if (currentMessageIndex === -1) {
                    currentMessageIndex = _currentMessageIndex;
                } else if (currentMessageIndex !== _currentMessageIndex) {
                    navigate(0); // Перезагружает текущую страницу
                }
            }
            invoke();
        }, 500); // 500 миллисекунд

        // Очистка интервала при размонтировании компонента или изменении состояния
        return () => clearInterval(intervalId);
    }, [isTimerActive]); // Добавляем состояние в зависимости

    const stopTimer = () => {
        setIsTimerActive(false); // Останавливаем таймер
    };*/
    
    function onChangeSelectChat() {
        currentSelectChatID = (Number(location.pathname.split('/')[3]));
    }

    function getToken() {
        return Cookies.get('token');
    }

    async function sendMessage(_chatID, _bySend, _messageText) {
        try {
            const response = await fetch('/messenger_api/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatID: _chatID, 
                    bySend: _bySend ,
                    messageText: _messageText
                }),
            });

            const data = await response.json();
            return data.chatsList;
        } catch (error) {
            console.log('Ошибка при получении имени пользователя:', error);
        }
    };

    async function listUserChats() {
        try {
            const token = getToken();
            const response = await fetch('/messenger_api/list_all_chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token
                }),
            });

            const data = await response.json();
            return data.chatsList;
        } catch (error) {
            console.log('Ошибка при получении имени пользователя:', error);
        }
    };

    async function loadCurrentMessageIndex(_chatID) {
        try {
            const response = await fetch('/messenger_api/get_current_message_index', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatID: _chatID
                }),
            });

            const data = await response.json();
            console.log('_chatID=', _chatID, ', data=', data);
            return data.currentMessageIndex;
        } catch (error) {
            console.log('Ошибка при получении имени пользователя:', error);
        }
    };

    async function loadChatMessages(_chatID) {
        try {
            const response = await fetch('/messenger_api/list_chat_messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatID: _chatID
                }),
            });

            const data = await response.json();
            return data.chatMessages;
        } catch (error) {
            console.log('Ошибка при получении имени пользователя:', error);
        }
    };

    async function loadChatsUsers(_chatID) {
        try {
            const response = await fetch('/messenger_api/get_chat_users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatID: _chatID
                }),
            });

            const data = await response.json();
            return data.chatUsers;
        } catch (error) {
            console.log('Ошибка при получении имени пользователя:', error);
        }
    };

    async function loadUserNameByID(_userID) {
        try {
            const response = await fetch('/messenger_api/get_user_name_by_id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: _userID
                }),
            });

            const data = await response.json();
            return data.userName;
        } catch (error) {
            console.log('Ошибка при получении имени пользователя:', error);
        }
    };

    async function loadCUserID() {
        try {
            const token = getToken();
            const response = await fetch('/messenger_api/get_user_id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token
                }),
            });

            const data = await response.json();
            return data.userID;
        } catch (error) {
            console.log('Ошибка при получении имени пользователя:', error);
        }
    };

    const handleInput = (event) => {
        setValue(event.target.value);
        event.target.style.height = 'auto'; // сбрасываем высоту перед измерением
        event.target.style.height = `${event.target.scrollHeight}px`; // устанавливаем высоту в зависимости от содержимого
    };

    const handlePress = (event) => {
        if (event.key === 'Enter') {
            if (!event.shiftKey) {
                sendData();
            }
        }
    }
    
    const dataFoundPeople = [
        // {userName:'Чувак 1', imageUrl:'/image/defaultProfile.png'},
        // {userName:'Чувак 2', imageUrl:'/image/defaultProfile.png'},
    ]
    interface Messages {
        textInOneMsg: string,
        bySend: number
    }
    interface DataMsg {
        id:number,
        userName:string,
        messages: Messages[]
    }
    const dataMessage:DataMsg[] = [
        {
            id: 0,
            userName: 'Китаец первый',
            messages: [
                { textInOneMsg: 'Давай взорвем россию', bySend: -1 },
                { textInOneMsg: 'Все будет хорошо', bySend: -1 },

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


                    <div className="Short-chat-list flex flex-col overflow-scroll overflow-x-hidden h-full grid-cols-1 " onClick={onChangeSelectChat}>

                            {messagesData.map(item =>
                                <ShortMsg key={item.id} userName={item.userName} lastMsg={item.messages[item.messages.length - 1]}
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
                    {messagesData.filter(item => item.id === parseInt(location.pathname[location.pathname.length - 1]))
                        .map(item => item.userName)}

                </div>

                    <div className="h-full  flex flex-col overflow-scroll overflow-x-hidden h-full grid-cols-1 " ref={messagesEndRef}>
                        {messagesData.filter(item => item.id === parseInt(location.pathname[location.pathname.length - 1]))
                            .map(item => <MessageList key={item.id} text={item.messages} currentUserID={currentUserID}/>)}
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