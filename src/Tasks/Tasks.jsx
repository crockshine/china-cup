import './Tasks.css'
import TaskCard from './TaskCard'

export default function Tasks(){
  return(
      <main>
        <div className="main_blocks">
          <TaskCard card__title="My Task"
          deadline="April 15, 2023"
          files__count={14}
          tasks__count={2}
          members__count={5}/>
          <TaskCard card__title="My Task"
          deadline="April 15, 2023"
          files__count={14}
          tasks__count={2}
          members__count={5}/>
          <TaskCard card__title="My Task"
          deadline="April 15, 2023"
          files__count={14}
          tasks__count={2}
          members__count={5}/>
        </div>
      </main>
  )
}

