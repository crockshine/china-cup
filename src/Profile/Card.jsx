    export default function Card({
      name,
      stack,
      mail,
      solutions,
      work
    }){
  return(
    <div className="card">
          <div class="user_datas">
              <img src="/icons/defaultProfile.png" alt="" class="user_photo" />
              <div class="more_about">
                  <h1 class="name">{name}</h1>
                  <h2 class="stack">{stack}</h2>
              </div>
          </div>

          <div class="user_mails">
            <div className="user_mails__blocks">
              <img className="mails_blocks__image" src="/icons/files.png" alt="" />
              <h3 class="mail">{mail}</h3>
            </div>
            <div className="user_mails__blocks">
            <img className="mails_blocks__image" src="/icons/tasks.png" alt="" />
            <h3 class="mail">{solutions} Solutions</h3>
            </div>
            <div className="user_mails__blocks">
            <img className="mails_blocks__image" src="/icons/settingsProfile.png" alt="" />
            <h3 class="mail">Work: {work}</h3>
            </div>
          </div>
    </div>
  )
}