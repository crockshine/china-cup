import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

export default function TaskCard({taskID}){
  const [taskName, setTaskName] = React.useState('');
  const [taskDeadLine, setTaskDeadLine] = React.useState('');
  const [taskSubTasksCount, setTaskSubTasksCount] = React.useState(0);
  const [taskMembers, setTaskMembers] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const taskData = await uploadTaskData(taskID);
      setTaskName(taskData.task_name);
      setTaskDeadLine(taskData.dead_line);
      setTaskSubTasksCount(taskData.sub_tasks_count);
      setTaskMembers(taskData.members);
    }
    fetchData();
  }, [navigate]);

  async function uploadTaskData(_taskID) {
    const response = await fetch('/api/get_task_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskID: _taskID,
      }),
    });

    const data = await response.json();
    return data.taskData;
  }

  const downloadTask = ()=>{

  }  
  return (
    <div className="task_card hover:cursor-pointer" onClick={downloadTask}>
      <div className="card__title">
        <p>{taskName}</p>
      </div>
      <div className="card__description">
        <div className="deadline">
          <img className="image_Card" src="../icons/time.jpg" alt="" />
          <h1 className="card__label ">Deadline: {new Date(taskDeadLine).toLocaleDateString()}</h1>
        </div>
        <div className="files__count">
          <img className="image_Card" src="../icons/download.jpg" alt="" />
          <h1 className="card__label">{0} Files</h1>
        </div>
        <div className="tasks__count">
          <img className="image_Card" src="../icons/count.jpg" alt="" />
          <h1 className="card__label">Sub Tasks {taskSubTasksCount}</h1>
        </div>
        <div className="members__count">
          <img className="image_Card" src="../../public/icons/members.jpg" alt="" />
          <h1 className="card__label">Members {taskMembers.length}</h1>
        </div>
      </div>
    </div>
  );
}
