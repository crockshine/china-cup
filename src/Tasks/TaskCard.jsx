export default function TaskCard(){
  return(
    <div className="task_card">
            <div className="card__title">
              <p>fweojjwfe</p>
            </div>
            <div className="card__description">
              <div className="deadline">
                <img className="image_Card" src="../icons/time.jpg" alt="" />
                  <h1 className="card__label ">Deadline: 09/25/2025</h1>
              </div>
              <div className="files__count">
              <img className="image_Card" src="../icons/download.jpg" alt="" />
                <h1 className="card__label">4 Files</h1>
              </div>
              <div className="tasks__count">
              <img className="image_Card" src="../icons/count.jpg" alt="" />
                <h1 className="card__label">Sub Tasks 6</h1>
              </div>
              <div className="members__count">
              <img className="image_Card" src="../icons/members.jpg" alt="" />
                <h1 className="card__label">Members 5</h1>
              </div>
            </div>
          </div>
  )
}
