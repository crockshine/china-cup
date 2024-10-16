import './Tasks.css'
import TaskCard from './TaskCard'

export default function Tasks(){
  return(
      <main>
        <div className="main_blocks">
          <TaskCard/>
          <TaskCard/>
          <TaskCard/>
          <TaskCard/>
          <TaskCard/>
        </div>
      </main>

  )
}

