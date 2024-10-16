export default function Messege({isSend, text}){
    return (
        <div className={`w-full flex p-5 ${isSend ? "justify-end text-end " : "justify-start text-start "}`}>
            <div
                className={`InMsg w-fit h-fit max-w-sm p-5 ${isSend ? "bg-white  " : "bg-sky-100 "}  right-2  font-bold text-slate-500 rounded-2xl`}>
                {text}
            </div>

        </div>
    )
}