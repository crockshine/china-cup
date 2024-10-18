const { tryToLogin, makeSession, getUserName, getUserNickName, listAllTasks, getTaskData, registerAccount } = require('./auth');
const { listAllChatsForUser, printInfo } = require('./messenger_mgr');
const cookieParser = require('cookie-parser');


const express = require('express');
const path = require('path');

const app = express();
app.use(cookieParser()); // Подключаем middleware для работы с куками
const PORT = 3000;

printInfo();

// Указываем папку со статическими файлами (React build)
app.use(express.static(path.join(__dirname, '../build')));

// Middleware для парсинга JSON
app.use(express.json());

require('./routes')(app);

// Обработка всех остальных маршрутов, которые не относятся к API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});



