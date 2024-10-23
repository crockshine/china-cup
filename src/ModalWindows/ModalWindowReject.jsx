import LeftBar from "../Pages/LeftBar/LeftBar";
import {useState} from "react";
import {values} from "mobx";
import ModalReject from "../Stores/ModalReject";
import AdminTask from "../Stores/AdminTask";

export default function ModalWindowReject({isOpen, closeWindow, id}){
    const [comment, setComment] = useState('')
    const handleResolve = () => {
        setComment('')
        //console.log(id); мы пушим задачу по айди, которое переданно в Incomming
        //логика отправки комента на задачу
        AdminTask.takeToSent(AdminTask.incomingTasks, id)

        ModalReject.closeWindow()

    }
    const handleChange = (e) => {
        setComment(e.target.value)
    }

    return (
        <div className={`${isOpen ? "block" : "hidden"}`}>
            <div onClick={closeWindow}
                 className={` w-screen h-screen absolute left-0 flex items-center justify-center bg-slate-700 opacity-70 z-30`}>

            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-slate-50 p-10 w-1/2 h-5/6 rounded-2xl gap-4 z-40 flex flex-col">
                <div className="w-full h-14 border rounded-2xl flex items-center justify-between">
                    <span className="w-fit h-full border-r-2 font-bold text-lg text-slate-600 flex items-center p-6">To:</span>
                    <span className="flex-1 h-full font-bold text-lg text-slate-600 flex items-center p-6">userName</span>
                </div>

                <textarea className="w-full flex-1 border rounded-2xl outline-0 resize-none  p-3 text-base font-medium text-slate-500"
                placeholder="Write your comment"
                value={comment}
                onChange={handleChange}></textarea>

                <div className="w-full h-14 flex items-center justify-center">
                    <button className="w-1/2 h-full border border-red-500 rounded-2xl text-lg font-bold text-red-950 hover:bg-red-500 hover:text-slate-50 transition"
                    onClick={handleResolve}>Resolve task</button>
                </div>
            </div>
        </div>
    )
}