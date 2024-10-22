export default function leaderboard({
  person_image,
  person_name,
  person_place,
  stages_count,
  solutions,
  stack,
  tasks_count
}){
  return(
    <div className="leader_card">
    <div className="person">
      <img className="leader_card_image" src={person_image} alt="" />
      <div className="about">
      <p className="person_name">{person_name}</p>
      <p className="person_place">{person_place} Place</p>
      </div>
    </div>
    <div className="person_state">
      <div className="options_state"><img className="image_state" src="/image/search.png" alt="" /> <p>{stages_count} Stages</p></div>
      <div className="options_state"><img className="image_state" src="/image/search.png" alt="" /> <p>{solutions} Solutions</p></div>
      <div className="options_state"><img className="image_state" src="/image/search.png" alt="" /> <p>{stack} Developer</p></div>
      <div className="options_state"><img className="image_state" src="/image/search.png" alt="" /> <p>{tasks_count} Tasks</p></div>
    </div>
  </div>
  )
}