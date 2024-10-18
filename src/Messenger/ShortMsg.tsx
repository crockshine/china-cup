import {Link, useLocation} from "react-router-dom";

interface Messages{
    textInOneMsg: string,
    isSend: boolean
}
export default function ShortMsg({userName, lastMsg, router_link}:{ userName:string, lastMsg: Messages, router_link:number}){
    const location = useLocation()
    return (
        <Link to={`/home/messenger/${router_link}`}>
        <div className={`Chat-card  min-h-32 max-h-32  overflow-hidden flex items-center justify-center p-4 ${location.pathname[location.pathname.length - 1] === router_link.toString() ? "bg-blue-600 rounded-2xl text-white": "bg-slate-50 text-slate-700"}`}
            >
            <img src="/icons/defaultProfile.png" alt="" className="w-20 h-20  rounded-full border-white"/>
            <div className="w-full h-full flex flex-col">
                <div className="flex justify-between items-center">
                    <span className="Name w-full text-base sm:text-lg font-bold">{userName}</span>
                    <span className="font-medium "></span>
                </div>

                <span className={`ShortMsg w-full  text-base font-semibold ${location.pathname[location.pathname.length - 1] === router_link.toString() ? "text-slate-300": "text-slate-500"}`}>{(lastMsg != undefined && lastMsg != null) ? lastMsg.textInOneMsg : ""} </span>

            </div>
        </div>
        </Link>
    )
}