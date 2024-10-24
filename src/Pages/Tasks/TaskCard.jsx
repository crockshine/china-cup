import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import './TaskCard.css';
import Cookies from 'js-cookie';

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

function getToken() {
  return Cookies.get('token');
}

async function removeTaskForUser(_taskID) {
  const _token = getToken();

  const response = await fetch('/tasks_api/remove_picked_task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: _token,
      taskID: _taskID,
    }),
  });

  const data = await response.json();
  return data.operationResult;
}

async function getTaskStageState(_taskID) {
  const _token = getToken();

  const response = await fetch('/tasks_api/get_picked_task_stage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: _token,
      taskID: _taskID,
    }),
  });

  const data = await response.json();
  return data.taskStage;
}

async function getAdminComment(_taskID) {
  const _token = getToken();

  const response = await fetch('/tasks_api/get_admin_comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      taskID: _taskID,
      token: _token
    }),
  });

  const data = await response.json();
  return data.adminComment;
}

async function upTaskStageState(_taskID) {
  const _token = getToken();

  const response = await fetch('/tasks_api/up_picked_task_stage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: _token,
      taskID: _taskID,
    }),
  });

  const data = await response.json();
  return data.taskStage;
}

async function setTaskSolution(_taskID, _comment, _code) {
  const _token = getToken();

  const response = await fetch('/tasks_api/set_picked_task_solution', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: _token,
      taskID: _taskID,
      comment: _comment,
      code: _code
    }),
  });

  const data = await response.json();
  return data.operationResult;
}

async function tryTaskAgain(_taskID) {
  const _token = getToken();

  const response = await fetch('/tasks_api/try_again', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      taskID: _taskID,
      token: _token
    }),
  });

  const data = await response.json();
}

function Modal({ _taskID, isOpen, onClose, onSubmit }) {
  const [comment, setComment] = React.useState('');
  const [code, setCode] = React.useState('');
  const navigate = useNavigate();
  useEffect(() => {

  }, [navigate]);
  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setTaskSolution(_taskID, comment, code);
    await upTaskStageState(_taskID, comment, code);
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2 className="modal_label">Send the solution to the task</h2>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
        />
        <div className="file-upload">
          <div className="upload_title">
            <p className="image_upload__title">Insert your source code here:</p>
          </div>
          <div className="code-container">
            <div className="line-numbers">
              {code.split('\n').map((_, index) => (
                <span key={index}>{index + 1}</span>
              ))}
            </div>
            <textarea
              placeholder="Insert your source code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="modal_codearea"
            />
          </div>
        </div>
        <div className="modal_buttons">
          <button className="modal_button1" type="submit">Send</button>
          <button className="modal_button2" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default function TaskCard({ taskID, pickedTasksList }) {
  const [taskName, setTaskName] = React.useState('');
  const [taskDeadLine, setTaskDeadLine] = React.useState('');
  const [taskSubTasksCount, setTaskSubTasksCount] = React.useState(0);
  const [taskMembers, setTaskMembers] = React.useState([]);
  const [taskPickState, setTaskPickState] = React.useState(false);
  const [taskStageState, setTaskStageState] = React.useState(0);
  const [isModalOpen, setModalOpen] = React.useState(false);

  const navigate = useNavigate();

  const stagesStr = new Map([
    [0, 'User choice task'],
    [1, 'Awaiting moderation response'],
    [2, 'Incorrect solution of the task'],
    [3, 'Task solved'],
  ]);

  async function fetchData() {
    const taskData = await uploadTaskData(taskID);
    setTaskName(taskData.task_name);
    setTaskDeadLine(taskData.dead_line);
    setTaskSubTasksCount(taskData.sub_tasks_count);
    setTaskMembers(taskData.members);

    const _taskPickState = pickedTasksList && pickedTasksList.includes(taskID);
    setTaskPickState(_taskPickState);

    const taskStage = _taskPickState ? await getTaskStageState(taskID) : -1;
    setTaskStageState(taskStage);
  }

  useEffect(() => {
    fetchData();
  }, [navigate, pickedTasksList]);

  // Функция для скачивания файла с описанием задания
  const downloadTask = async () => {
    if (isModalOpen) return;

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

    // Перезагружаем эту хуйню если изменили ее статус
    if (!pickedTasksList || !pickedTasksList.includes(taskID)) {
      navigate(0);
    }
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

  const cancelTaskPick = async (event) => {
    event.stopPropagation(); // Останавливаем всплытие события

    const operationResult = await removeTaskForUser(taskID);

    if (operationResult === 'ok') {
      navigate(0);
    }
  };

  const viewDetails = (event) => {
    event.stopPropagation(); // Останавливаем всплытие события

    async function invoke() {
      const adminComment = await getAdminComment(taskID);
      alert(adminComment);
    }

    invoke();
  };

  const tryAgain = (event) => {
    event.stopPropagation(); // Останавливаем всплытие события

    async function invoke() {
      await tryTaskAgain(taskID);
      navigate(0);

    }

    invoke();
  };

  const sendTask = async (event) => {
    event.stopPropagation(); // Останавливаем всплытие события
    setModalOpen(true);
  };

  const handleModalSubmit = (updatedData) => {
  };

  return (
    <div className="task_card hover:cursor-pointer" onClick={downloadTask}>
      <div className="card__header">
        <div className={`card__title ${taskPickState ? `picked${taskStageState}` : ''}`}>
          <p>{taskName}{(taskPickState ? ` | ${stagesStr.get(taskStageState)}` : '')}</p>
        </div>

        <div className={(taskPickState && taskStageState == 0) ? "block" : "hidden"}>
          <div className="button-container">
            <input type="button" value="Send" onClick={sendTask}/>
            <input type="button" value="Сancel" onClick={cancelTaskPick} />
          </div>
        </div>

        <div className={(taskPickState && taskStageState == 1) ? "block" : "hidden"}>
          <div className="button-container">
            <input type="button" value="Cancel the parcel" onClick={cancelTaskPick} />
          </div>
        </div>

        <div className={(taskPickState && taskStageState == 2) ? "block" : "hidden"}>
          <div className="button-container">
            <input type="button" value="View details" onClick={viewDetails} />
            <input type="button" value="Try again" onClick={tryAgain} />
            <input type="button" value="Сancel" onClick={cancelTaskPick} />

          </div>
        </div>

      </div>
      <div className="card__description">
        <div className="deadline">
          <img className="image_Card" src="../icons/time.jpg" alt="" />
          <h1 className="card__label">Deadline: {new Date(taskDeadLine).toLocaleDateString()}</h1>
        </div>
        <div className="files__count">
          <img className="image_Card" src="../icons/download.jpg" alt="" />
          <h1 className="card__label">{1} File</h1>
        </div>
        <div className="tasks__count">
          <img className="image_Card" src="../icons/count.jpg" alt="" />
          <h1 className="card__label">Sub Tasks {taskSubTasksCount}</h1>
        </div>
        <div className="members__count">
          <img className="image_Card" src="../icons/members.jpg" alt="" />
          <h1 className="card__label">Members {taskMembers.length}</h1>
        </div>
      </div>
      <Modal
              _taskID={taskID}
              isOpen={isModalOpen}
              onClose={() => {setModalOpen(false); navigate(0); }}
              onSubmit={handleModalSubmit}
          />
    </div>
  );
}
