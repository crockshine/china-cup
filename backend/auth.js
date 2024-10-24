const path = require('path');
const fs = require('fs');
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 587,
    secure: false,
    auth: {
        user: 'aleksservera@mail.ru', // ваш email
        pass: 'YB6haLwasNUi7PCGnW3y' // новый пароль приложения
    }
});

const JWT_SECRET = 'goida';

async function sendEmail(to, subject, text) {
    const mailOptions = {
        from: 'aleksservera@mail.ru',
        to: to,
        subject: subject,
        text: text
    };

    try {
        await transport.sendMail(mailOptions);
        console.log(`Письмо отправлено на ${to}`);
    } catch (error) {
        console.error('Ошибка при отправке письма:', error.message);
    }
}

function generateConfirmationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Генерация 6-значного кода
}

async function addNewTask(token, title, deadLine, subTasksCount, taskPrice) {
    const userRole = await getUserRole(token);

    // p.s. 5 - id роли администратора
    if (userRole != 5) {
        console.error('Ошибка при попытке добавить новую задачу:пользователю недостаточно прав.');
        return "no";
    }

    try {
        // Преобразование строки "2024-10-14" в формат даты
        const deadlineDate = new Date(deadLine);

        if (isNaN(deadlineDate.getTime())) {
            console.error('Неверный формат даты.');
            return "no";
        }

        // Вставляем новую задачу в базу данных
        const result = await db.query(
            `INSERT INTO task (task_name, dead_line, sub_tasks_count, task_price) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [title, deadlineDate, subTasksCount, taskPrice]
        );

        // const newTask = result.rows[0];

        // if (newTask) {
        //     console.log('Задача успешно добавлена');
             return "ok";
        // } else {
        //     console.error('Не удалось добавить задачу.');
        //     return "no";
        // }
    } catch (err) {
        console.error('Ошибка при попытке добавить новую задачу:', err.message);
        throw new Error('Add new failed');
    }
}

const verifyConfirmationCode = async (confirmationCode) => {
    try {
        const userverifmailResult = await db.query('SELECT email FROM "user" ORDER BY created_at DESC LIMIT 1');
        const userverifmail = userverifmailResult.rows[0].email; // Получаем первую строку результата
        console.log(userverifmail);

        const rightCodeResult = await db.query('SELECT confirmation_code FROM "user" ORDER BY created_at DESC LIMIT 1');
        const rightCode = rightCodeResult.rows[0]?.confirmation_code; // Получаем confirmation_code из первой строки
        console.log(rightCode);
        if (rightCode === confirmationCode) {
            return true // Код подтверждения верый
        } else {
            return false // Код подтверждения неверный
        }
    } catch (error) {
        console.error('Ошибка при проверке кода подтверждения:', error);
    }
}

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
        console.error('tryToLogin: Ошибка при попытке входа:', err.message);
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
        console.log(userRole);
        if(userRole === null || userRole === '' || userRole === ' ') {  
            userRole = 'Administration';
        }
        
        // Получаем ID роли
        const userRoleID = await getRoleID(userRole);

        console.log(userRoleID);
        
        // Хэшируем пароль перед сохранением
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        // Генерируем код подтверждения
        const confirmationCode = generateConfirmationCode();

        // Выполняем SQL запрос для добавления пользователя
        const result = await db.query(
            `INSERT INTO "user" (email, password_hash, role_id, nickname, name, created_at, progress_value, confirmation_code)
             VALUES ($1, $2, $3, $4, $5, NOW(), $6, $7) RETURNING *`,
            [userMail, hashedPassword, userRoleID, userNickname, userName, 0, confirmationCode]
        );
        
        // Отправка кода подтверждения на почту
        const subject = 'Код подтверждения регистрации';
        const text = `Ваш код подтверждения: ${confirmationCode}`;
        await sendEmail(userMail, subject, text);

        return 'ok'
    } catch (err) {
        console.error('registerAccount: Ошибка при регистрации:', err.message);
        return 'ne ok'
    }
}

// Создает новую сессию и возвращает токен
async function makeSession(userMail) {
    // Ищем пользователя по email
    const result = await db.query('SELECT * FROM "user" WHERE email = $1', [userMail]);
    const user = result.rows[0];

    // Генерируем JWT токен
    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1d' });

    // Сохраняем сессию в БД
    await db.query(
        'INSERT INTO session (user_id, token, created_at) VALUES ($1, $2, NOW())',
        [user.user_id, token]
    );

    return token;
}

// Удаляет сессию по токену
async function deleteSession(token) {
    try {
        console.log(token);
        // Удаляем сессию из БД по токену
        const result = await db.query('DELETE FROM session WHERE token = $1', [token]);
        console.log(result);
        // Проверяем, была ли сессия удалена
        if (result.rowCount === 0) {
            throw new Error('deleteSession: Сессия не найдена или уже удалена');
        }

        return { message: 'deleteSession: Сессия успешно удалена' };
    } catch (error) {
        console.error('deleteSession: Ошибка при удалении сессии:', error.message);
        throw error;
    }
}


async function getUserProgressValue(token) {
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

        return user.progress_value; // Предполагается, что в таблице есть поле 'progress_value'
    }
    catch (err) {
        console.log('Ошибка в getUserProgressValue:', err);
        return null; // Обрабатывайте ошибки по необходимости
    }
}

// Получение имени пользователя по токену
async function getUserName(token) {
    if (!token) {
        console.log('getUserName: Токен не предоставлен');
        return null; // Или выбросьте ошибку, если необходимо
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "user" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('getUserName: Пользователь не найден');
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
        console.log('getUserNickName: Токен не предоставлен');
        return null;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "user" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('getUserNickName: Пользователь не найден');
            return null;
        }

        return user.nickname; // Предполагается, что в таблице есть поле 'nickname'
    }
    catch (err) {
        console.log('Ошибка в getUserNickName:', err);
        return null;
    }
}

async function getUserTechStack(token) {
    if (!token) {
        console.log('getUserTechStack: Токен не предоставлен');
        return null;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "user" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('getUserTechStack: Пользователь не найден');
            return null;
        }

        return user.techstack; // Предполагается, что в таблице есть поле 'techstack'
    }
    catch (err) {
        console.log('Ошибка в getUserTechStack:', err);
        return null;
    }
}

async function getUserMail(token) {
    if (!token) {
        console.log('getUserMail: Токен не предоставлен');
        return null;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const result = await db.query('SELECT * FROM "user" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('getUserMail: Пользователь не найден');
            return null;
        }

        return user.email; // Предполагается, что в таблице есть поле 'email'
    }
    catch (err) {
        console.log('Ошибка в getUserMail:', err);
        return null;
    }
}

async function setUserData(token, nickname, email, techStack) {
    if (!token) {
        console.log('setUserData: Токен не предоставлен');
        return null;
    }

    try {
        // Расшифровка токена
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId; // Предполагаем, что в токене есть userId

        // Проверка существования пользователя
        const result = await db.query('SELECT * FROM "user" WHERE user_id = $1', [userId]);
        const user = result.rows[0];

        if (!user) {
            console.log('setUserData: Пользователь не найден');
            return null;
        }

        //console.log(nickname, email, techStack);
        // Обновляем данные пользователя в базе данных
        const updateResult = await db.query(
            `UPDATE "user" 
             SET nickname = $1, email = $2, techstack = $3
             WHERE user_id = $4
             RETURNING *`,
            [nickname, email, techStack, userId]
        );

        const updatedUser = updateResult.rows[0];

        if (updatedUser) {
            console.log('setUserData: Данные пользователя успешно обновлены:', updatedUser);
            return updatedUser;
        } else {
            console.log('setUserData: Не удалось обновить данные пользователя');
            return null;
        }

    } catch (err) {
        console.log('Ошибка в setUserData:', err);
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
            console.log('getUserRole: Пользователь не найден');
            return null;
        }

        return user.role_id; // Предполагается, что в таблице есть поле 'role_id'
    }
    catch (err) {
        console.log('Ошибка в getUserRole:', err);
        return null;
    }
}

// Функция для получения всех user_id из базы данных
async function listAllUsers() {
    try {
        const result = await db.query('SELECT user_id FROM "user"');
        // Вернем массив всех user_id
        return result.rows.map(row => row.user_id);
    } catch (err) {
        console.error('listAllUsers: Ошибка при получении user_id:', err.message);
    }
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

module.exports = { tryToLogin, makeSession, deleteSession, getUserName, getUserNickName, listAllTasks, getTaskData, registerAccount, listAllUsers, getUserTechStack, getUserMail, setUserData, addNewTask, getUserRole,verifyConfirmationCode,getUserProgressValue };