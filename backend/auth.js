const { loadCurrentTaskID, listAllTasksInFolder } = require('./tasks_handler');

let currentTaskID = loadCurrentTaskID();
const allTasksList = listAllTasksInFolder();

const path = require('path');
const fs = require('fs');
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'goida';

// Попытка входа в аккаунт (сравнение вводимого пароля и почты с необходимыми)
async function tryToLogin(userMail, userPassword) {
    try {
        // Ищем пользователя по email
        const result = await db.query('SELECT * FROM "user" WHERE email = $1', [userMail]);
        
        // Если пользователь не найден, возвращаем false
        if (result.rows.length === 0) return false;

        const user = result.rows[0];

        // Сравниваем введённый пароль с хэшированным паролем в базе данных
        const passwordMatch = await bcrypt.compare(userPassword, user.password_hash);

        // Возвращаем true, если пароли совпадают, иначе false
        return passwordMatch;
    } catch (err) {
        console.error('Ошибка при попытке входа:', err.message);
        throw new Error('Login failed');
    }
}

const rolesMap = new Map([
    ["Administration", 5],
    ["Student", 1],
    ["Graduate", 2]
]);

async function getRoleID(roleName) {
    return rolesMap.get(roleName);
}

async function registerAccount(userMail, userPassword, userRole, userNickname, userName) {
    try {
        // Проверяем, существует ли пользователь с таким email
        const emailCheck = await db.query('SELECT * FROM "user" WHERE email = $1', [userMail]);
        if (emailCheck.rows.length > 0) {
            console.log('Пользователь с таким email уже существует');
            return 'ne ok';
        }

        // Проверяем, существует ли пользователь с таким nickname
        const nicknameCheck = await db.query('SELECT * FROM "user" WHERE nickname = $1', [userNickname]);
        if (nicknameCheck.rows.length > 0) {
            console.log('Пользователь с таким nickname уже существует');
            return 'ne ok'; 
        }

        // Получаем ID роли
        const userRoleID = await getRoleID(userRole);
        
        // Хэшируем пароль перед сохранением
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        // Выполняем SQL запрос для добавления пользователя
        const result = await db.query(
            `INSERT INTO "user" (email, password_hash, role_id, nickname, name, created_at)
             VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
            [userMail, hashedPassword, userRoleID, userNickname, userName]
        );
        
        return 'ok'
    } catch (err) {
        console.error('Ошибка при регистрации:', err.message);
        return 'ne ok'
    }
}

// Создает новую сессию и возвращает токен
async function makeSession(userMail) {
    // Ищем пользователя по email
    const result = await db.query('SELECT * FROM "user" WHERE email = $1', [userMail]);
    const user = result.rows[0];

    // Генерируем JWT токен
    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '90m' });

    // Сохраняем сессию в БД
    await db.query(
        'INSERT INTO session (user_id, token, created_at) VALUES ($1, $2, NOW())',
        [user.user_id, token]
    );

    return token;
}

// Получение имени пользователя по токену
async function getUserName(token) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null; // Или выбросьте ошибку, если необходимо
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "user" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('Пользователь не найден');
            return null;
        }

        return user.name; // Предполагается, что в таблице есть поле 'name'
    }
    catch (err) {
        console.log('Ошибка в getUserName:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

// Аналогично для getUserNickName
async function getUserNickName(token) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "user" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('Пользователь не найден');
            return null;
        }

        return user.nickname; // Предполагается, что в таблице есть поле 'nickname'
    }
    catch (err) {
        console.log('Ошибка в getUserNickName:', err);
        return null;
    }
}

async function getUserRole(token) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "user" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('Пользователь не найден');
            return null;
        }

        return user.role_id; // Предполагается, что в таблице есть поле 'nickname'
    }
    catch (err) {
        console.log('Ошибка в getUserRole:', err);
        return null;
    }
}

const tasks_folder = "./tasks"
// вспомогательная функция, просто возвращает путь к файлу задания исходя из ID этой задачи
function getTaskFilePath(taskID) {
    return path.join(tasks_folder, `task_${taskID}.json`);
}


function loadTaskJSON(taskID) {
    const _path = getTaskFilePath(taskID);
    if (!fs.existsSync(_path)) return null;

    const fileContent = fs.readFileSync(_path, 'utf8');
    const task_jsonData = JSON.parse(fileContent);

    return task_jsonData;
}

function listAllTasks() {
    return allTasksList;
}

function getTaskData(taskID) {
    return loadTaskJSON(taskID);
}

module.exports = { tryToLogin, makeSession, getUserName, getUserNickName, listAllTasks, getTaskData, registerAccount };
