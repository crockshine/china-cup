import './Tasks.css';
import TaskCard from './TaskCard';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAutoAnimate } from '@formkit/auto-animate/react'
function getToken() {
  return Cookies.get('token');
}

async function uploadPickedTasksList() {
  try {
    const _token = getToken();
    const response = await fetch('/tasks_api/list_all_picked_tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: _token
      }),
    });

    const data = await response.json();
    return data.userPickedTasks;
  } catch (error) {
    console.log("Error in uploadAllTasksList:", error);
    //setError(error);
    return [];
  }
}

async function uploadAllTasksList() {
  try {
    const response = await fetch('/api/list_all_tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    return data && data.allTasksList ? data.allTasksList : [];
  } catch (error) {
    console.log("Error in uploadAllTasksList:", error);
    //setError(error);
    return [];
  }
}

async function addNewTask(_title, _deadLine, _subTasksCount, _taskPrice) {
  try {
    const _token = getToken();
    const response = await fetch('/api/add_new_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: _token,
        title: _title,
        deadLine: _deadLine,
        subTasksCount: _subTasksCount,
        taskPrice: _taskPrice
      }),
    });

    const data = await response.json();
  } catch (error) {
    console.log("Error in uploadAllTasksList:", error);
    //setError(error);
    return [];
  }
}

async function getUserRole() {
  try {
      const token = getToken();
      const response = await fetch('/api/get_user_role', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              token: token
          }),
      });
      
      const data = await response.json();
      return data.userRole;
  } catch (error) {
      console.log('Ошибка при получении никнейма пользователя:', error);
  }
};

export default function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const [pickedTasksList, setPickedTasksList] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [files, setFiles] = useState([]);
  const [numTasks, setNumTasks] = useState(1);
  const [taskPrice, setTaskPrice] = useState(25);
  const [userRole, setUserRole] = useState(-1);
  
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const _allTasksList = await uploadAllTasksList();
        setTasksList(_allTasksList);

        const _userRole = await getUserRole();
        setUserRole(_userRole);

        const pickedTasksList = await uploadPickedTasksList();
        setPickedTasksList(pickedTasksList);
      } catch (error) {
        console.log('Tasks.useEffect.fetchData:error=', error);
        setError(error);
      }
    }
    fetchData();
  }, [navigate]);

  const handleModalSubmit = (event) => {
    event.preventDefault();
    const taskData = { title, deadline, files, numTasks, taskPrice };
    //console.log('New Task Data:', taskData);
    addNewTask(title, deadline, numTasks, taskPrice);
    setModalOpen(false); 
    navigate(0); // Перезагружает текущую страницу
  };
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  return (
    <main>
      {error && <div className="error">{error}</div>}
      <div className="main_blocks" ref={parent}>
        <div className="add_tasks" ref={parent}>
          {(userRole == 5) ? (<button
              className="add_button_tasks"
              onClick={() => setModalOpen(true)}
          >
            +
          </button>) : (<div></div>)}
        </div>
        {Array.isArray(tasksList) && tasksList.length > 0 ? (
            tasksList.map((item) => (
                <TaskCard key={item} taskID={item} pickedTasksList={pickedTasksList}/>
            ))
        ) : (
            <div>No tasks available</div>
        )}
      </div>

      {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <form onSubmit={handleModalSubmit}>
                <label>
                  Title:
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </label>
              <label>
                Deadline:
                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
              </label>
              <div className="file-upload">
                <div className="upload_title_tasks">
                <label>
                  Upload Files:
                  </label>
                  <label htmlFor="file-input" className="custom-file-upload">
                    Choose File
                  </label>
                  </div>
                  <input className='input_image' type="file" multiple onChange={(e) => setFiles([...e.target.files])} />
                  </div>
              <label className="number_tasks">
                Number of Tasks:
                <input type="number" value={numTasks} onChange={(e) => setNumTasks(e.target.value)} min="1" required />
              </label>
              <label>
                Price of the task:
                <input type="number" value={taskPrice} onChange={(e) => setTaskPrice(e.target.value)} min="5" max="200" required />
              </label>
              <div className="button_tasks">
              <button className="submit_task__button" type="submit">Create Task</button>
              <button className="close_button" onClick={() => setModalOpen(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
