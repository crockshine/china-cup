const { tryToLogin, makeSession, getUserName, getUserNickName, listAllTasks, getTaskData, registerAccount } = require('./../auth')
const authMiddleware = require('./../middleware'); // Путь к файлу с вашим middleware

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

            // Отправляем токен клиенту
            res.json({ loginState: 'true', token });
        } else {
            res.json({ loginState: 'false' });
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

    app.post('/api/list_all_tasks', (req, res) => { 
        const _allTasksList = listAllTasks();
        res.json({ allTasksList: _allTasksList });
    });

    app.post('/api/get_task_data_name', (req, res) => { 
        const { taskID } = req.body;

        const _taskData = getTaskData(taskID);
        res.json( {taskData: _taskData.task_name });
    });

    app.post('/api/get_task_data_dead_line', (req, res) => { 
        const { taskID } = req.body;

        const _taskData = getTaskData(taskID);
        res.json( {taskData: _taskData.dead_line });
    });

    app.post('/api/get_task_data_sub_tasks_count', (req, res) => { 
        const { taskID } = req.body;

        const _taskData = getTaskData(taskID);
        res.json( {taskData: _taskData.sub_tasks_count });
    });

    app.post('/api/get_task_data_members', (req, res) => { 
        const { taskID } = req.body;

        const _taskData = getTaskData(taskID);
        res.json( {taskData: _taskData.members });
    });
};
