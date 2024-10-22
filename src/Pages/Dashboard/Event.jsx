export default function Event({
  image,
  event_title,
  what_todo,
  time
}){
  return(
    <div className="event">
          <img className="image_event"src={image} alt="" />
          <div className="title">
            <p className="event_title">{event_title}</p>
            <p className="what_todo">{what_todo}</p>
          </div>
          <p className="time_event">{time}</p>
        </div>
  )
}