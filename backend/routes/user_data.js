const { tryToLogin, makeSession, getUserName, getUserNickName, listAllTasks, getTaskData } = require('./../auth')

module.exports = function (app) {
    // Маршрут для API запроса
    app.post('/api/login', (req, res) => {
        const { userMail, userPassword } = req.body; // Получение данных из запроса

        if (tryToLogin(userMail, userPassword)) {
            const _sessionID = makeSession(userMail);

            // Установка куков
            //res.cookie('loggedIn', 'true', { maxAge: 3600000 }); // 1 час в миллисекундах
            //es.cookie('sessionID', _sessionID, { maxAge: 3600000 }); // 1 час в миллисекундах

            console.log('User login: ' + userMail + ', ' + userPassword + ', ' + _sessionID);

            // Отправка ответа обратно на клиент
            res.json({ loginState: 'true', sessionID: _sessionID });
        } else {
            // Отправка ответа обратно на клиент
            res.json({ loginState: 'false', sessionID: -1 });
        }
    });

    app.post('/api/get_user_name', (req, res) => { 
        const { sessionID } = req.body;

        const _userName = getUserName(sessionID);
        res.json({ userName: _userName });
    });

    app.post('/api/get_user_nickname', (req, res) => { 
        const { sessionID } = req.body;

        const _userNickName = getUserNickName(sessionID);
        res.json({ userNickName: _userNickName });
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
