import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

export default function TaskCard({taskID}){
  const [taskName, setTaskName] = React.useState('');
  const [taskDeadLine, setTaskDeadLine] = React.useState(-1);
  const [taskSubTasksCount, setTaskSubTasksCount] = React.useState(-1);
  const [taskMembers, setTaskMembers] = React.useState([]);

  const navigate = useNavigate(); // Хук для навигации
  useEffect(() => {
    async function fetchData() {
      const _taskName = await uploadTaskData(taskID, '/api/get_task_data_name');
      const _taskDeadLine = await uploadTaskData(taskID, '/api/get_task_data_dead_line');
      const _taskSubTasksCount = await uploadTaskData(taskID, '/api/get_task_data_sub_tasks_count');
      const _taskMembers = await uploadTaskData(taskID, '/api/get_task_data_members');

      setTaskName(_taskName);
      setTaskDeadLine(_taskDeadLine);
      setTaskSubTasksCount(_taskSubTasksCount);
      setTaskMembers(_taskMembers);
    }
    fetchData();
  }, [navigate]);

  async function uploadTaskData(_taskID, url_adrr) {
    const response = await fetch(url_adrr , {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
          taskID: _taskID
      }),
    });

    const data = await response.json();
    return data.taskData;
  }

  return(
    <div className="task_card">
            <div className="card__title">
              <p>{taskName}</p>
            </div>
            <div className="card__description">
              <div className="deadline">
                <img className="image_Card" src="../icons/time.jpg" alt="" />
                  <h1 className="card__label ">Deadline: {taskDeadLine}</h1>
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
  )
}
