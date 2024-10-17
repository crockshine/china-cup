import "./Dashboard.css"
import Leaderboard from "./Leaderboard"
import Event from "./Event"

export default function Dashboard(){
  return(
    <main className="main_content__dashboard">
      <div className="all_dashboard">
      <div className="left_achievements">
        <div className="left_blocks">
          <h1 className="count">21</h1>
          <h2>Projects</h2>
          </div>
        <div className="left_blocks">
          <h1 className="count">145</h1>
        <h2>Tasks</h2>
        </div>
        <div className="left_blocks">
          <h1 className="count">12</h1>
        <h2>Members</h2>
        </div>
        <div className="left_blocks">
          <h1 className="count">18</h1>
        <h2>Stages</h2></div>
      </div>
      <div className="events">
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>
      </div>
      <div className="leaderboard">
        <Leaderboard 
        person_name={"Aleksandr Surovtsev"}
        stages_count={4}
        solutions={12}
        stack={"Full-Stack"}
        tasks_count={"5"}/>
                <Leaderboard 
        person_name={"Aleksandr Surovtsev"}
        stages_count={4}
        solutions={12}
        stack={"Full-Stack"}
        tasks_count={"5"}/>
                <Leaderboard 
        person_name={"Aleksandr Surovtsev"}
        stages_count={4}
        solutions={12}
        stack={"Full-Stack"}
        tasks_count={"5"}/>
                <Leaderboard 
        person_name={"Aleksandr Surovtsev"}
        stages_count={4}
        solutions={12}
        stack={"Full-Stack"}
        tasks_count={"5"}/>
      </div>
      </div>
    </main>

  )
}