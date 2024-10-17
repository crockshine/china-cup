export default function ShortMsg({isActive}){
    return (
        <div className={`Chat-card  min-h-32 max-h-32  overflow-hidden flex items-center justify-center p-4 ${isActive ? "bg-blue-600 rounded-2xl text-white": "bg-slate-50 text-slate-700"}`}
            >
            <img src="../icons/defaultProfile.png" alt="" className="w-20 h-20  rounded-full border-white"/>
            <div className="w-full h-full flex flex-col">
                <div className="flex justify-between items-center">
                    <span className="Name w-full text-base sm:text-lg font-bold">Жопа Китайцам</span>
                    <span className="font-medium ">12:21</span>
                </div>

                <span className={`ShortMsg w-full  text-base font-semibold ${isActive ? "text-slate-300": "text-slate-500"}`}>пsasdasd asdsasdfdsfdsв зов </span>

            </div>

        </div>
    )
}