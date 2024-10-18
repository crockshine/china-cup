import './Tasks.css';
import TaskCard from './TaskCard';
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

export default function Tasks() {
  const [tasksList, setTasksList] = React.useState([]);
  const [error, setError] = React.useState(null);
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
        
        if (data && data.allTasksList) {
            return data.allTasksList; // Вернем массив задач
        } else {
            return []; // Вернем пустой массив, если данных нет
        }
    } catch (error) {
        console.log("Error in uploadAllTasksList:", error);
        setError(error);
        return []; // Вернем пустой массив в случае ошибки
    }
}


return (
    <main>
      {error && <div className="error">{error}</div>} {/* Отображение ошибки */}
      <div className="main_blocks">
        {Array.isArray(tasksList) && tasksList.length > 0 ? (
          tasksList.map((item, index) => (
            <TaskCard key={item} taskID={item} /> // Добавление ключа
          ))
        ) : (
          <div>No tasks available</div> // Сообщение, если задач нет
        )}
      </div>
    </main>
  );
}
