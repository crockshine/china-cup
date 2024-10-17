const loadAllUsers = require('./users_handler');
const loadCurrentSessionID = require('./sessions_handler');
const { loadCurrentTaskID, listAllTasksInFolder } = require('./tasks_handler');

const path = require('path');
const fs = require('fs');

// загрузка пользователей
const users = loadAllUsers();

// загрузка текущего максимального значения сессии
let currentSessionID = loadCurrentSessionID();

let currentTaskID = loadCurrentTaskID();
const allTasksList = listAllTasksInFolder();
console.log('currentTaskID=', currentTaskID, ', allTasksList=', allTasksList)

// попытка входа в аккаунт (сравнение вводимого пароля и почты с необходимыми)
function tryToLogin(userMail, userPassword) {
    // Проверка, есть ли такой пользователь вообще:
    if (!users.has(userMail)) return false;

    const jsonData = users.get(userMail);
    return jsonData.User.password == userPassword;
}

const sessions_folder = "./sessions"
// вспомогательная функция, просто возвращает путь к файлу сессии исходя из ID этой сессии
function getSessionFilePath(sessionID) {
    return path.join(sessions_folder, `session_${sessionID}.json`);
}

const users_folder = "./users"
// вспомогательная функция, просто возвращает путь к файлу пользователя исходя из ID этого пользователя
function getUserFilePath(userID) {
    return path.join(users_folder, `user_${userID}.json`);
}

const tasks_folder = "./tasks"
// вспомогательная функция, просто возвращает путь к файлу задания исходя из ID этой задачи
function getTaskFilePath(taskID) {
    return path.join(tasks_folder, `task_${taskID}.json`);
}

// создает новую сессию и возвращает ID этой (новой) сессии
function makeSession(userMail) {
    currentSessionID++;
    const userID = getUserIDByMail(userMail);

    const data = {
        id: currentSessionID,
        session_state: "open",
        user_id: userID,
        user_mail: userMail
    };

    // Преобразование объекта в строку JSON
    const jsonData = JSON.stringify(data, null, 2); // null и 2 для форматирования

    // Запись данных в файл
    const _path = getSessionFilePath(currentSessionID);
    fs.writeFile(_path, jsonData, (err) => {
        /*if (err) {
            console.error('Ошибка при создании файла:', err);
        } else {
            console.log(`Файл успешно создан: 'session_${currentSessionID}.json'`);
        }*/
    });

    return currentSessionID;
}

// вспомогательная функция, возвращает ID пользователя исходя из его эл почты
// обращается к предварительно загруженному мапу с ждейсонками пользователей
function getUserIDByMail(userMail) {
    if (!users.has(userMail)) return null;

    const jsonData = users.get(userMail);
    return jsonData.User.id;
}

function loadUserJSON(userID) {
    const _path = getUserFilePath(userID);
    if (!fs.existsSync(_path)) return null;

    const fileContent = fs.readFileSync(_path, 'utf8');
    const user_jsonData = JSON.parse(fileContent);

    return user_jsonData;
}

function loadTaskJSON(taskID) {
    const _path = getTaskFilePath(taskID);
    if (!fs.existsSync(_path)) return null;

    const fileContent = fs.readFileSync(_path, 'utf8');
    const task_jsonData = JSON.parse(fileContent);

    return task_jsonData;
}

function loadSessionJSON(sessionID) {
    const _path = getSessionFilePath(sessionID);
    if (!fs.existsSync(_path)) return null;

    const fileContent = fs.readFileSync(_path, 'utf8');
    const session_jsonData = JSON.parse(fileContent);

    return session_jsonData;
}

function getUserName(sessionID) {
    const sessionJson = loadSessionJSON(sessionID);
    const userID = sessionJson.user_id;

    const userJson = loadUserJSON(userID)
    return userJson.User.name;
} 

function getUserNickName(sessionID) {
    const sessionJson = loadSessionJSON(sessionID);
    const userID = sessionJson.user_id;

    const userJson = loadUserJSON(userID);
    return userJson.User.nickname;
}

function listAllTasks() {
    return allTasksList;
}

function getTaskData(taskID) {
    return loadTaskJSON(taskID);
}

module.exports = { tryToLogin, makeSession, getUserName, getUserNickName, listAllTasks, getTaskData };