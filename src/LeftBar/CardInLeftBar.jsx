export default function CardInLeftBar({text,image,opacity}){
    return (
        <div className="border-2 rounded-2xl flex flex-col items-center justify-center aspect-square ">
            <img src={image} alt="" style={{opacity:opacity}} />
            <span>{text}</span>
        </div>
    )
}