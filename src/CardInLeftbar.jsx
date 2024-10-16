export default function CardInLeftbar({text, image, opacity}){
    return (
        <div className="border-2 rounded-2xl flex flex-col items-center justify-center aspect-square "
             style={{opacity:opacity}}
        >
            <img src={image} alt=""/>
            <span>{text}</span>
        </div>
    )
}