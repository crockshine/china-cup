const db = require('./db'); // Подключаем модуль для работы с БД

// Получение текущего максимального ID задачи
async function loadCurrentTaskID() {
    const result = await db.query('SELECT MAX(id) as max_id FROM task');
    const maxID = result.rows[0].max_id || 0; // Если нет задач, вернуть 0
    return maxID;
}

// Получение всех ID задач
async function listAllTasksInFolder() {
    const result = await db.query('SELECT id FROM task');
    const taskIDs = result.rows.map(row => row.id);
    return taskIDs;
}

module.exports = { loadCurrentTaskID, listAllTasksInFolder };