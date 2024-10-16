import CardInLeftbar from "./CardInLeftbar";

export default function LeftBar(){
    const InfoCardInLeftbar =[
        {id:0, text:'Dashboard', image:'../icons/dashboard', opacity:1},
        {id:1, text:'Messenger', image:'../icons/messenger', opacity:1},
        {id:2, text:'Tasks', image:'../icons/tasks', opacity:1},
        {id:3, text:'Files', image:'../icons/files', opacity:1},
        {id:4, text:'Schedule', image:'../icons/schedules', opacity:0.3},
        {id:5, text:'Graduates', image:'../icons/graduation', opacity:1},
    ]
    const InfoComponents = InfoCardInLeftbar.map(card => {
        return <CardInLeftbar text={card.text} image={card.image} opacity={card.opacity} key={card.id}/>
    })

    return (
        <div
            className="LeftBar h-full px-4 sm:px-10 pb-10 w-80 border flex flex-col items-center justify-between overflow-auto">

            {/* Переход в профиль */}
            <div className="flex w-full items-center justify-between mb-4">
                <img src="../icons/settingsProfile.png" alt="" className="w-10 h-10 sm:w-12 sm:h-12"/>
                <img src="../icons/settings.png" alt="" className="w-10 h-10 sm:w-12 sm:h-12"/>
            </div>

            <div className="MainInfo flex flex-col mb-5 items-center flex-grow">
                {/* Если авы нет добавить стандартную */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-full mb-5 flex justify-center items-center bg-cover">
                    <img src="../icons/defaultProfile.png" alt="" className="opacity-70"/>
                    <div className="w-28 h-28 border-4 absolute border-amber-500 rounded-full"></div>
                </div>

                <span className="Name text-xl sm:text-2xl font-black text-slate-900">dasddasdsasa</span>
                <span className="Mail text-base sm:text-lg font-bold text-slate-500">dasdasd</span>
            </div>

            <div className="Card w-full grid grid-row-3 grid-cols-2 gap-2 justify-center mb-4 flex-grow">

            </div>

            <div className="flex flex-col w-full gap-2">
                <div className="bg-slate-600 w-full h-6 sm:h-10"></div>
                <div className="bg-slate-600 w-full h-6 sm:h-10"></div>
            </div>
        </div>
    )
}