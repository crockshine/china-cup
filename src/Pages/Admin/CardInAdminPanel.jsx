export default function CardInAdminPanel(){
    return (
        <div className="w-full h-14 gap-2  bg-slate-50 border rounded-2xl p-3 flex items-center justify-between">
            <img src="/image/defaultProfile.png" alt="" className="w-10 h-10"/>

            <div className="w-full h-full flex font-bold text-lg text-slate-600 items-center ">
                userName
            </div>

            <img src="/image/edit.png" alt="" className="h-6 w-6 hover:cursor-pointer hover:-rotate-12 transition"/>
            <img src="/image/delete.png" alt=""
                 className="h-6 w-6 opacity-70  hover:cursor-pointer hover:scale-125 transition"/>

        </div>
    )
}