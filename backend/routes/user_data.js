const { tryToLogin, makeSession, deleteSession, getUserName, getUserNickName, registerAccount, 
        getUserTechStack, getUserMail, setUserData, addNewTask, getUserRole, verifyConfirmationCode,
        getUserProgressValue } = require('./../auth')
const { checkForAllUsers } = require('./../dashboard_handler');

const db = require('./../db');  // Замените на корректный путь к файлу db.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'goida'; // Используйте ваш секретный ключ для JWT
const express = require('express');
const QRCode = require('qrcode');
const cors = require('cors');



module.exports = function (app) {
    app.post('/api/login', async (req, res) => {
        const { userMail, userPassword } = req.body;

        console.log("try to login");

        if (await tryToLogin(userMail, userPassword)) {
            const token = await makeSession(userMail);

            // Отправляем токен клиенту
            res.json({ loginState: 'true', token });
        } else {
            res.json({ loginState: 'false' });
        }
    });

    app.post('/api/register', async (req, res) => {
        const { userMail, userPassword, userRole, userNickname, userName } = req.body;

        console.log( "Введённые данные: " + userMail + " " + userPassword + " " + userRole + " " + userNickname + " " + userName);

        // сначала регаемся
        const registrationResult = await registerAccount(userMail, userPassword, userRole, userNickname, userName);
        console.log(registrationResult);

        if (registrationResult != 'ok') {
            res.json({ loginState: 'false' });
            return;
        }

        // потом еще делаем вход
        if (await tryToLogin(userMail, userPassword)) {
            const token = await makeSession(userMail);

            checkForAllUsers();
            // Отправляем токен клиенту
            res.json({ loginState: 'true', token });
        } else {
            res.json({ loginState: 'false' });
        }
    });

    app.post('/api/delete_session', async (req, res) => {
        const { token } = req.body;

        try {
            const result = await deleteSession(token);
            res.status(200).json({ message: 'user_data: delete session: Сессия успешно удалена' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    
    app.post('/api/get_user_progress_value', async (req, res) => {
        const { token } = req.body;

        try {
            const userProgressValue = await getUserProgressValue(token);
            res.json({ userProgressValue });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });
            
    app.post('/api/verify-confirmation-code', async (req, res) => {
        const { confirmationCode } = req.body;
    
        console.log("Получен код для проверки:", confirmationCode);
    
        try {
            const isValid = await verifyConfirmationCode(confirmationCode);
            console.log(isValid)
            if (isValid) {
                res.json({ message: "Код подтверждения верный" });
            } else {
                res.status(400).json({ error: "Неверный код подтверждения" });
            }
        } catch (err) {
            console.error("Ошибка при валидации:", err);
            res.status(500).json({ error: "Ошибка при валидации кода подтверждения" });
        }
    });

    app.post('/api/scan', async (req, res) => {
        const { code } = req.body;
        try {
            await db.query('UPDATE qr_codes SET scan_count = scan_count + 1 WHERE code = $1', [code]);
        } 
        catch (error) {
            console.error('Ошибка при увеличении счетчика:', error);
        }
    });
    

    app.get('/api/generate', async (req, res) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const code = Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    
        const options = {
            errorCorrectionLevel: 'H', 
            version: 8, 
            margin: 3, 
            width: 300 
        };
    
        try {
            const qrCodeUrl = await QRCode.toDataURL(code, options);
            res.json({ code, qrCodeUrl });
        } catch (error) {
            console.error('Ошибка генерации QR-кода:', error);
            res.status(500).send('Ошибка генерации QR-кода');
        }
    });
    

    app.post('/api/get_user_name', async (req, res) => { 
        const { token } = req.body;

        try {
            const userName = await getUserName(token);
            res.json({ userName });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/api/get_user_nickname', async (req, res) => { 
        const { token } = req.body;

        try {
            const userNickName = await getUserNickName(token);
            res.json({ userNickName });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/api/get_user_role', async (req, res) => { 
        const { token } = req.body;

        try {
            const _userRole = await getUserRole(token);
            res.json({ userRole: _userRole });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/api/get_user_techstack', async (req, res) => { 
        const { token } = req.body;

        try {
            const _userTechStack = await getUserTechStack(token);
            res.json({ userTechStack: _userTechStack });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/api/get_user_mail', async (req, res) => { 
        const { token } = req.body;

        try {
            const _userMail = await getUserMail(token);
            res.json({ userMail: _userMail });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/api/set_user_data', async (req, res) => { 
        const { token, nickname, email, techStack } = req.body;

        try {
            await setUserData(token, nickname, email, techStack);
            res.json({ result: "ZAEBIS" });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/api/list_all_tasks', async (req, res) => {
        try {
          const result = await db.query('SELECT id FROM task');
          const allTasksList = result.rows.map(row => row.id);
          res.json({ allTasksList });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to list tasks' });
        }
    });

    app.post('/api/get_task_data', async (req, res) => {
        const { taskID } = req.body;
      
        try {
          const taskResult = await db.query(
            'SELECT t.task_name, t.dead_line, t.sub_tasks_count, array_agg(tm.user_id) AS members FROM task t LEFT JOIN task_members tm ON t.id = tm.task_id WHERE t.id = $1 GROUP BY t.id',
            [taskID]
          );
          const taskData = taskResult.rows[0];
          res.json({ taskData });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to fetch task data' });
        }
    });

    app.post('/api/get_task_price', async (req, res) => {
        const { taskID } = req.body;
      
        try {
            const result = await db.query(
                `SELECT * FROM "task" WHERE id = $1`,
                [taskID]
            );
          const _taskPrice = result.rows[0].task_price;
          res.json({ taskPrice: _taskPrice });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to fetch task price data' });
        }
    });

    app.post('/api/add_new_task', async (req, res) => {
        const { token, title, deadLine, subTasksCount, taskPrice } = req.body;
      
        try {
            console.log('kek:', title);
            const _result = await addNewTask(token, title, deadLine, subTasksCount, taskPrice);
            res.json({ result: _result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch task data' });
        }
    });


    app.post('/api/add_user_to_task', async (req, res) => {
      const { taskID } = req.body;

      try {
        // Извлекаем JWT токен из cookies
        const token = req.cookies.token;

        if (!token) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        // Декодируем JWT токен
        const decoded = jwt.verify(token, JWT_SECRET);
        const userID = decoded.userId; // Предполагается, что в токене есть поле userId

        // Проверяем, есть ли пользователь уже в задаче
        const checkResult = await db.query(
          'SELECT * FROM task_members WHERE task_id = $1 AND user_id = $2',
          [taskID, userID]
        );

        if (checkResult.rows.length === 0) {
          // Пользователь еще не в задаче, добавляем его
          await db.query(
            'INSERT INTO task_members (task_id, user_id, task_stage) VALUES ($1, $2, $3)',
            [taskID, userID, 0]
          );
          res.status(200).json({ message: 'Пользователь добавлен в задачу' });
        } else {
          // Пользователь уже в задаче
          res.status(200).json({ message: 'Пользователь уже добавлен в задачу' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при добавлении пользователя в задачу' });
      }
    });
    };
