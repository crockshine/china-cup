import './Tasks.css';
import TaskCard from './TaskCard';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasksList, setTasksList] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [files, setFiles] = useState([]);
  const [numTasks, setNumTasks] = useState(1);
  const [numParticipants, setNumParticipants] = useState(1);
  
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const _allTasksList = await uploadAllTasksList();
        setTasksList(_allTasksList);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    fetchData();
  }, [navigate]);

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
      setError(error);
      return [];
    }
  }

  const handleModalSubmit = (event) => {
    event.preventDefault();
    const taskData = { title, deadline, files, numTasks, numParticipants };
    console.log('New Task Data:', taskData);
    setModalOpen(false); 
  };

  return (
    <main>
      {error && <div className="error">{error}</div>}
      <div className="main_blocks">
        <div className="add_tasks">
          <button 
            className="add_button_tasks" 
            onClick={() => setModalOpen(true)}
          >
            +
          </button>
        </div>
        {Array.isArray(tasksList) && tasksList.length > 0 ? (
          tasksList.map((item) => (
            <TaskCard key={item} taskID={item} />
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
                Number of Participants:
                <input type="number" value={numParticipants} onChange={(e) => setNumParticipants(e.target.value)} min="1" required />
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
