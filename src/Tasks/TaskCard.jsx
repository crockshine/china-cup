export default function TaskCard({
  card__title,
  deadline,
  files__count,
  tasks__count,
  members__count,
}) {
  return(
    <div className="task_card">
            <div className="card__title">
              <p>{card__title}</p>
            </div>
            <div className="card__description">
              <div className="deadline">
                <img className="image_Card" src="../icons/time.jpg" alt="" />
                  <h1 className="card__label ">{deadline}</h1>
                <img className="image_Card" src="../../public/icons/time.jpg" alt="" />
                  <h1 className="card__label ">Deadline: 09/25/2025</h1>
              </div>
              <div className="files__count">
              <img className="image_Card" src="../icons/download.jpg" alt="" />
                <h1 className="card__label">{files__count} Files</h1>
              </div>
              <div className="tasks__count">
              <img className="image_Card" src="../icons/count.jpg" alt="" />
                <h1 className="card__label">Sub Tasks   {tasks__count}</h1>
              </div>
              <div className="members__count">
              <img className="image_Card" src="../icons/members.jpg" alt="" />
                <h1 className="card__label">Members {members__count}</h1>
              </div>
            </div>
          </div>
  )
}
