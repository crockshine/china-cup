import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

export default function TaskCard({ taskID }) {
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

  // Функция для скачивания файла с описанием задания
  const downloadTask = async () => {
    const fileName = `task_${taskID}.txt`; // Название файла
    const fileUrl = `/tasks/${fileName}`; // Путь к файлу на сервере (в папке public/tasks)

    // Отправляем запрос на сервер для добавления пользователя в задачу
    await addUserToTask(taskID);

    // Создаем скрытый <a> элемент для скачивания
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName);

    // Программно кликаем на ссылку, чтобы скачать файл
    document.body.appendChild(link);
    link.click();

    // Удаляем ссылку после скачивания
    document.body.removeChild(link);
  };

  // Функция для добавления пользователя в задачу
  const addUserToTask = async (taskID) => {
    try {
      const response = await fetch('/api/add_user_to_task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskID
        }),
      });

      if (response.ok) {
        console.log('Пользователь добавлен в задачу');
      } else {
        console.error('Ошибка при добавлении пользователя в задачу');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className="task_card hover:cursor-pointer" onClick={downloadTask}>
      <div className="card__title">
        <p>{taskName}</p>
      </div>
      <div className="card__description">
        <div className="deadline">
          <img className="image_Card" src="../icons/time.jpg" alt="" />
          <h1 className="card__label">Deadline: {new Date(taskDeadLine).toLocaleDateString()}</h1>
        </div>
        <div className="files__count">
          <img className="image_Card" src="../icons/download.jpg" alt="" />
          <h1 className="card__label">{1} Files</h1>
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
