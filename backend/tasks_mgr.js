const path = require('path');
const fs = require('fs');
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'goida';

async function listAllPickedtasks(token) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null; // Или выбросьте ошибку, если необходимо
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "task_members" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('Пользователь не найден');
            return null;
        }

        const taskIds = result.rows.map(row => row.task_id);

        return taskIds; // Предполагается, что в таблице есть поле 'progress_value'
    }
    catch (err) {
        console.log('Ошибка в getUserProgressValue:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

async function removePickedTask(token, taskID) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null; // Или выбросьте ошибку, если необходимо
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "task_members" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('Пользователь не найден');
            return null;
        }

        const result_removeTaskMember = await db.query(
            `DELETE FROM task_members 
             WHERE task_id = $1 AND user_id = $2;`,
            [taskID, userId]
        );

        return 'ok'; // Предполагается, что в таблице есть поле 'progress_value'
    }
    catch (err) {
        console.log('Ошибка в getUserProgressValue:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

async function getPickedTaskStage(token, taskID) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null; // Или выбросьте ошибку, если необходимо
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "task_members" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('Пользователь не найден');
            return null;
        }

        const result_getTaskMember = await db.query(
            `SELECT * FROM "task_members" WHERE task_id = $1 AND user_id = $2`,
            [taskID, userId]
        );

        return result_getTaskMember.rows[0].task_stage; // Предполагается, что в таблице есть поле 'progress_value'
    }
    catch (err) {
        console.log('Ошибка в getUserProgressValue:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

async function setPickedTaskStage(token, taskID, taskStage) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null; // Или выбросьте ошибку, если необходимо
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const setSulutionResult = await db.query(
            `UPDATE "task_members" 
             SET task_stage = $3
             WHERE task_id = $1 AND user_id = $2
             RETURNING *`,
            [taskID, userId, taskStage]
        );

        return 'ok';
    }
    catch (err) {
        console.log('Ошибка в getUserProgressValue:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

async function setPickedTaskSolution(token, taskID, comment, code) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null; // Или выбросьте ошибку, если необходимо
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const setSulutionResult = await db.query(
            `UPDATE "task_members" 
             SET comment = $3, code = $4, time = NOW()
             WHERE task_id = $1 AND user_id = $2
             RETURNING *`,
            [taskID, userId, comment, code]
        );

        return 'ok';
    }
    catch (err) {
        console.log('Ошибка в getUserProgressValue:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

async function getTasksDataByStage(taskStage) {
    try {
        const result_getTaskMember = await db.query(
            `SELECT * FROM "task_members" WHERE task_stage = $1`,
            [taskStage]
        );

        return result_getTaskMember.rows;
    }
    catch (err) {
        console.log('Ошибка в getUserProgressValue:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

async function approveTaskSolution(taskID, userID) {
    try {
        const setSulutionResult = await db.query(
            `UPDATE "task_members" 
             SET task_stage = $3, admin_comment = $4
             WHERE task_id = $1 AND user_id = $2
             RETURNING *`,
            [taskID, userID, 3, 'ok']
        );

        return 'ok';
    }
    catch (err) {
        console.log('Ошибка в getUserProgressValue:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

async function rejectTaskSolution(taskID, userID, comment) {
    try {
        const setSulutionResult = await db.query(
            `UPDATE "task_members" 
             SET task_stage = $3, admin_comment = $4
             WHERE task_id = $1 AND user_id = $2
             RETURNING *`,
            [taskID, userID, 2, comment]
        );

        return 'ok';
    }
    catch (err) {
        console.log('Ошибка в getUserProgressValue:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

async function tryTaskAgain(taskID, token) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null; // Или выбросьте ошибку, если необходимо
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "task_members" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('Пользователь не найден');
            return null;
        }

        const setSulutionResult = await db.query(
            `UPDATE "task_members" 
             SET task_stage = $3, admin_comment = $4, comment = $5, code = $6, time = NOW()
             WHERE task_id = $1 AND user_id = $2
             RETURNING *`,
            [taskID, userId, 0, '', '', '']
        );

        return 'ok';
    }
    catch (err) {
        console.log('Ошибка в getUserProgressValue:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

async function getAdminComment(taskID, token) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null; // Или выбросьте ошибку, если необходимо
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "task_members" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('Пользователь не найден');
            return null;
        }

        const result_getTaskMember = await db.query(
            `SELECT * FROM "task_members" WHERE task_id = $1 AND user_id = $2`,
            [taskID, userId]
        );

        return result_getTaskMember.rows[0].admin_comment; // Предполагается, что в таблице есть поле 'progress_value'
    }
    catch (err) {
        console.log('Ошибка в getUserProgressValue:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

async function getUncheckedTasksData() {
    return await getTasksDataByStage(1);
}

module.exports = { listAllPickedtasks, removePickedTask, getPickedTaskStage, setPickedTaskStage, 
    setPickedTaskSolution, getTasksDataByStage, getUncheckedTasksData, approveTaskSolution, 
    rejectTaskSolution, tryTaskAgain, getAdminComment };