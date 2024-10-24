import ModalReject from "../../../Stores/ModalReject";
import AdminTask from "../../../Stores/AdminTask";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './IncomingTaskCard.css';

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

async function loadUserNickNameByID(_userID) {
    try {
        const response = await fetch('/messenger_api/get_user_nickname_by_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: _userID
            }),
        });

        const data = await response.json();
        return data.userNickName;
    } catch (error) {
        console.log('Ошибка при получении ника пользователя:', error);
    }
};

async function approveTaskSolution(_taskID, _userID) {
    const response = await fetch('/tasks_api/approve_task_solution', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            taskID: _taskID,
            userID: _userID,
        }),
    });

    const data = await response.json();
    return data;
}

async function rejectTaskSolution(_taskID, _userID, _comment) {
    const response = await fetch('/tasks_api/reject_task_solution', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            taskID: _taskID,
            userID: _userID,
            comment: _comment
        }),
    });

    const data = await response.json();
    return data;
}

function Modal_SolutionView({ comment, solutionSource, userName, isOpen, onClose }) {
    return (
        <div className={`${isOpen ? "modal block" : "hidden"}`}>
            <div onClick={onClose}
                 className={` w-screen h-screen absolute left-0 flex items-center justify-center bg-slate-700 opacity-70 z-30`}>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-slate-50 p-10 w-1/2 h-5/6 rounded-2xl gap-4 z-40 flex flex-col">
                <div className="file-upload">
                    <h2 className="modal_label">Send the solution to the task</h2>
                        <input
                            type="text"
                            value={comment}
                            placeholder="Comment"
                            readOnly
                        />
                    <div className="upload_title">
                        <p className="image_upload__title">Source code:</p>
                    </div>
                    <div className="code-container">
                        <div className="line-numbers">
                            {solutionSource.split('\n').map((_, index) => (
                                <span key={index}>{index + 1}</span>
                            ))}
                        </div>
                        <textarea
                            placeholder="Insert your source code here..."
                            value={solutionSource}
                            className="modal_codearea"
                            readOnly
                        />
                    </div>
                </div>

                <div className="w-full h-14 flex items-center justify-center">
                    <button className="w-1/2 h-full border border-red-500 rounded-2xl text-lg font-bold text-red-950 hover:bg-red-500 hover:text-slate-50 transition"
                    onClick={onClose}>Exit</button>
                </div>
            </div>
        </div>
    )
}

function Modal({ _taskID, _userID, userName, isOpen, onClose, onSubmit }) {
    const navigate = useNavigate();

    const [comment, setComment] = useState('')
    const handleResolve = () => {
        async function send() {
            await rejectTaskSolution(_taskID, _userID, comment);
        }

        send();

        setComment('');
        onClose();
        onSubmit();
        navigate(0);
    }
    const handleChange = (event) => {
        setComment(event.target.value)
    }

    return (
        <div className={`${isOpen ? "modal block" : "hidden"}`}>
            <div onClick={onClose}
                 className={` w-screen h-screen absolute left-0 flex items-center justify-center bg-slate-700 opacity-70 z-30`}>

            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-slate-50 p-10 w-1/2 h-5/6 rounded-2xl gap-4 z-40 flex flex-col">
                <div className="w-full h-14 border rounded-2xl flex items-center justify-between">
                    <span className="w-fit h-full border-r-2 font-bold text-lg text-slate-600 flex items-center p-6">To:</span>
                    <span className="flex-1 h-full font-bold text-lg text-slate-600 flex items-center p-6">{userName}</span>
                </div>

                <textarea className="w-full flex-1 border rounded-2xl outline-0 resize-none  p-3 text-base font-medium text-slate-500"
                    placeholder="Write your comment"
                    value={comment}
                    onChange={handleChange}>
                </textarea>

                <div className="w-full h-14 flex items-center justify-center">
                    <button className="w-1/2 h-full border border-red-500 rounded-2xl text-lg font-bold text-red-950 hover:bg-red-500 hover:text-slate-50 transition"
                    onClick={handleResolve}>Resolve task</button>
                </div>
            </div>
        </div>
    )
}

export default function IncomingTaskCard({ taskID, userID, time, setIncoming, userComment, code }) {
    
    const addAcceptTask = () => {
        //AdminTask.takeToSent(AdminTask.incomingTasks, taskID);
        //setIncoming([...AdminTask.incomingTasks]);
        async function send() {
            approveTaskSolution(taskID, userID);
        }

        send();
        navigate(0);
    }

    const [isModalOpen, setModalOpen] = useState(false);
    const [isSolutionViewModalOpen, setSolutionViewModalOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [userNickName, setUserNickName] = useState('');
    const [timeStr, setTimeStr] = useState('');

    const navigate = useNavigate();

    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Set to true for 12-hour format
    };

    useEffect(() => {
        async function fetchData(params) {
            const _userName = await loadUserNameByID(userID);
            setUserName(_userName);

            const _userNickName = await loadUserNickNameByID(userID);
            setUserNickName(_userNickName);

            //форматируем время:
            const __time = new Date(time);
            const formattedDateTime = __time.toLocaleString('en-US', options);
            setTimeStr(formattedDateTime);
        }

        fetchData();
    }, [navigate, userName, userNickName, userID]);

    const handleModalSubmit = (updatedData) => {

    };

    return (
        <div className="w-full h-14 gap-2  bg-slate-50 border rounded-2xl p-3 flex items-center justify-between">
            <img src="/image/defaultProfile.png" alt="" className="w-10 h-10" onClick={() => setSolutionViewModalOpen(true)}/>

            <div className="w-full h-full flex font-medium text-lg text-slate-600 items-center gap-2" >
                Name: <b>{userName}</b> <b></b><b></b>  
                {/* Nickname: <b>{userNickName}</b> <b></b><b></b> */}
                Comment: <b>{userComment}</b>
            </div>

            <span className={'w-full h-full flex items-center justify-end font-medium text-lg text-slate-600'}>{timeStr}</span>
            <b></b><b></b>  
            <button className="button_view_solution" type="button" onClick={() => setSolutionViewModalOpen(true)}>View</button>
            <b></b>
            <img src="/image/accept.png" alt="" className="h-6 w-6 hover:cursor-pointer hover:scale-125 transition"
                 onClick={addAcceptTask}/>

            <img src="/image/reject.png" alt="" className="h-6 w-6 hover:cursor-pointer hover:scale-125 transition"
                 onClick={() => setModalOpen(true)}/>
            <Modal
                _taskID={taskID}
                _userID={userID}
                userName={userName}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)} // Просто закрываем модал
                onSubmit={handleModalSubmit}
            />
            <Modal_SolutionView
                comment={userComment}
                solutionSource={code}
                userName={userName}
                isOpen={isSolutionViewModalOpen}
                onClose={() => setSolutionViewModalOpen(false)}
            />
        </div>
    )
}