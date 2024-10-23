import ModalReject from "../../../Stores/ModalReject";

export default function SentTaskCard({id, from, time}){
    return (
        <div className="w-full h-14 gap-2  bg-slate-50 border rounded-2xl p-3 flex items-center justify-between">
            <img src="/image/defaultProfile.png" alt="" className="w-10 h-10"/>

            <div className="w-full h-full flex font-medium text-lg text-slate-600 items-center gap-2">
                From: <b>{from}</b>
            </div>

            <span className={'w-full h-full flex items-center justify-end font-medium text-lg text-slate-600'}>time</span>

            <img src="/image/accept.png" alt="" className={`h-6 w-6 hover:cursor-pointer hover:scale-125 transition`}/>
            <img src="/image/reject.png" alt="" className={`h-6 w-6 hover:cursor-pointer hover:scale-125 transition`}
                 onClick={ModalReject.openWindow}/>

        </div>
    )
}