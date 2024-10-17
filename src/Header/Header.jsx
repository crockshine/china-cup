export default function Header(){
    return (
        <div className="Header max-w-screen-2xl h-32 flex">
            <div className="flex-1  flex justify-center items-center gap-5">
                <img src="../../public/icons/dropdown.png" alt="" className="w-5 h-5"/>
                <span className="font-semibold text-3xl text-slate-700">StudyBuddy</span>
            </div>
            <div className="flex-1 flex  justify-center items-center gap-10 font-semibold text-xl text-slate-700">
                <span className="">About Us</span>
                <span className="">News</span>
                <span className="">User Policy</span>

            </div>
            <div className="flex-1 "></div>
            <div className="flex-1 "></div>

        </div>
    )
}