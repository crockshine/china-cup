export default function Event_schedule({
  title,
  deadline_title
}){
  return(
    <div className="event_card">
              <p className="alert_title">{title}</p>
              <div className="deadline">
                <img className="deadline_image" src="/icons/deadline.jpg" alt="" />
                <p className="deadline_title">{deadline_title}</p>
              </div>
              </div>
  )
}