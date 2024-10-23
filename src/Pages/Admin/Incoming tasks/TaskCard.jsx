import ModalReject from "../../../Stores/ModalReject";
import AdminTask from "../../../Stores/AdminTask";

export default function TaskCard({id,from, time, setIncoming}){
    const handleModal = () => {
        ModalReject.setTaskId(id)
        ModalReject.openWindow()
    }
    const addAcceptTask = () => {
        //запрос на добавление к таске с id (id) из пропса флажка одобрено
        //а еще надо удалить эту хуйню из incoming
        AdminTask.takeToSent(AdminTask.incomingTasks, id)
        setIncoming([...AdminTask.incomingTasks]);
    }
    return (
        <div className="w-full h-14 gap-2  bg-slate-50 border rounded-2xl p-3 flex items-center justify-between">
            <img src="/image/defaultProfile.png" alt="" className="w-10 h-10"/>

            <div className="w-full h-full flex font-medium text-lg text-slate-600 items-center gap-2">
                From: <b>{from}</b>
            </div>

            <span className={'w-full h-full flex items-center justify-end font-medium text-lg text-slate-600'}>time</span>
            <img src="/image/accept.png" alt="" className="h-6 w-6 hover:cursor-pointer hover:scale-125 transition"
                 onClick={addAcceptTask}/>
            {/*тут надо к таске */}
            <img src="/image/reject.png" alt="" className="h-6 w-6 hover:cursor-pointer hover:scale-125 transition"
                 onClick={handleModal}/>

        </div>
    )
}