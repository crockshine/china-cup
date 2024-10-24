const { loadAllChatsInFolder, indexAllChatsInFolder } = require('./messenger_handler')

const path = require('path');
const fs = require('fs');
const db = require('./db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'goida';

const allChatsList = loadAllChatsInFolder();
const allChatsIndexing = indexAllChatsInFolder();

const chats_folder = "./chats"
// вспомогательная функция, просто возвращает путь к файлу задания исходя из ID этой задачи
function getChatFilePath(chatID) {
    return path.join(chats_folder, `chat_${chatID}.json`);
}

function loadChatJSON(chatID) {
    const _path = getChatFilePath(chatID);
    if (!fs.existsSync(_path)) return null;

    const fileContent = fs.readFileSync(_path, 'utf8');
    const chat_jsonData = JSON.parse(fileContent);

    return chat_jsonData;
}

// возвращает список всех id-шников чатов для пользователя данной сессии
async function listAllChatsForUser(token) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null; // Или выбросьте ошибку, если необходимо
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        return allChatsIndexing.get(userId);
    }
    catch (err) {
        console.log('Ошибка в getUserName:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

// возвращает список пользователей-участников данной переписки
async function getChatUsers(chatID) {
    const chat_jsonData = loadChatJSON(chatID);
    return chat_jsonData.users;
}

// получить с БД имя пользователя зная только его ШD
async function getUserNameByID(userID) {
    try {
        const result = await db.query('SELECT * FROM "user" WHERE user_id = $1', [userID]);
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

async function getUserNickNameByID(userID) {
    try {
        const result = await db.query('SELECT * FROM "user" WHERE user_id = $1', [userID]);
        const user = result.rows[0];

        if (!user) {
            console.log('Пользователь не найден');
            return null;
        }

        return user.nickname; // Предполагается, что в таблице есть поле 'nickname'
    }
    catch (err) {
        console.log('Ошибка в getUserNickNameByID:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

// возвращает id пользователя исходя из его токена
async function getUserID(token) {
    if (!token) {
        console.log('Токен не предоставлен');
        return null; // Или выбросьте ошибку, если необходимо
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        return userId;
    }
    catch (err) {
        console.log('Ошибка в getUserName:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

// взвращает ветку json с сообщениями
async function getChatMessages(chatID) {
    const chat_jsonData = loadChatJSON(chatID);
    return chat_jsonData.messages;
}

// Функция для обновления данных чата и сохранения изменений в файл
function updateChatJSON(chatID, newChatData) {
    const _path = getChatFilePath(chatID);
  
    // Загружаем существующие данные чата
    let chatData = loadChatJSON(chatID);
  
    // Обновляем данные чата
    chatData = { ...chatData, ...newChatData };
  
    // Сохраняем обновленные данные в файл
    fs.writeFileSync(_path, JSON.stringify(chatData, null, 2));
}

// добавить новое сообщение
function sendChatMessage(chatID, bySend, messageText) {
    const _path = getChatFilePath(chatID);
    let chatData = loadChatJSON(chatID);

    if (chatData.hasOwnProperty("messages")) {
        const currentMessage = chatData.current_message;

        chatData.current_message = currentMessage + 1;
        chatData.messages[String(currentMessage + 1)] = { "textInOneMsg": messageText, "bySend": bySend };
    
        updateChatJSON(chatID, chatData);
    } 
    else {
        chatData["messages"] = {
            "1": { "textInOneMsg": messageText, "bySend": bySend }
        };
        chatData.current_message = 1;

        // Сохраняем обновленные данные в файл
        fs.writeFileSync(_path, JSON.stringify(chatData, null, 2));
    }
}

async function getCurrentMessageIndex(chatID) {
    const chat_jsonData = loadChatJSON(chatID);
    return chat_jsonData.current_message;
}

function printInfo() {
    console.log('allChatsList=', allChatsList);
    console.log('allChatsIndexing=', allChatsIndexing);
}

module.exports = { listAllChatsForUser, getChatUsers, getUserNameByID, getUserID, getChatMessages, 
    sendChatMessage, getCurrentMessageIndex, printInfo, getUserNickNameByID };
