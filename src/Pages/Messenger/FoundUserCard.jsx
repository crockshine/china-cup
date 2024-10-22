export default function FoundUserCard({userName, imageUrl}){
    return (
        <label className="Card-new-people flex items-center w-full h-12 mb-4 cursor-pointer">
            <img src={imageUrl} alt=""
                 className="w-16 h-16  rounded-full border-white"/>
            <span className="font-bold text-sky-50">{userName}</span>
        </label>
    )
}