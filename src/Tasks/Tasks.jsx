import './Tasks.css'
import TaskCard from './TaskCard'

import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

export default function Tasks(){
    const [tasksList, setTasksList] = React.useState([]);
    const [error, setError] = React.useState(null); // Состояние для обработки ошибок
    const navigate = useNavigate(); // Хук для навигации

    useEffect(() => {
        async function fetchData() {
            try {
                // функция для загрузки списка всех задач с сервера:
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
                body: JSON.stringify({ }),
            });

            const data = await response.json();
            return data.allTasksList;
            
        } catch (error) {
            console.log("Error in uploadAllTasksList:", error);
            setError(error);
        }
    };

    return (
        <main>
            {error && <div className="error">{error}</div>} {/* Отображение ошибки */}
            <div className="main_blocks">
                {tasksList.map((item, index) => (
                    <TaskCard key={item} taskID={item} /> // Добавление ключа
                ))}
            </div>
        </main>


    )
}

