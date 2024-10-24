const { listAllPickedtasks, removePickedTask, getPickedTaskStage, setPickedTaskStage, setPickedTaskSolution, 
    getUncheckedTasksData, approveTaskSolution, rejectTaskSolution, tryTaskAgain, getAdminComment, incrementUserProgress } = require('./../tasks_mgr');

module.exports = function (app) {
    app.post('/tasks_api/list_all_picked_tasks', async (req, res) => {
        const { token } = req.body;

        try {
            const userPickedTasksList = await listAllPickedtasks(token);
            res.json( { userPickedTasks: userPickedTasksList });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/tasks_api/remove_picked_task', async (req, res) => {
        const { token, taskID } = req.body;

        try {
            const removePickTaskResult = await removePickedTask(token, taskID);
            res.json( { operationResult: removePickTaskResult });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/tasks_api/get_picked_task_stage', async (req, res) => {
        const { token, taskID } = req.body;

        try {
            const _taskStage = await getPickedTaskStage(token, taskID);
            res.json( { taskStage: _taskStage });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/tasks_api/up_picked_task_stage', async (req, res) => {
        const { token, taskID } = req.body;

        try {
            const _taskStage = await getPickedTaskStage(token, taskID) + 1;
            const _operationResult = await setPickedTaskStage(token, taskID, _taskStage);
            res.json( { taskStage: _taskStage, operationResult: _operationResult });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/tasks_api/set_picked_task_solution', async (req, res) => {
        const { token, taskID, comment, code } = req.body;

        try {
            const _operationResult = await setPickedTaskSolution(token, taskID, comment, code);
            res.json( { operationResult: _operationResult });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/tasks_api/get_unchecked_tasks_data', async (req, res) => {
        const {  } = req.body;

        try {
            const _data = await getUncheckedTasksData();
            res.json( { data: _data });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/tasks_api/approve_task_solution', async (req, res) => {
        const { taskID, userID } = req.body;

        try {
            const _data = await approveTaskSolution(taskID, userID);
            res.json( { data: _data });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/tasks_api/increment_user_progress', async (req, res) => {
        const { taskID, userID } = req.body;

        try {
            //console.log('taskID: ', taskID,', userID:', userID);
            const _data = await incrementUserProgress(taskID, userID);
            res.json( { data: _data });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/tasks_api/reject_task_solution', async (req, res) => {
        const { taskID, userID, comment } = req.body;

        try {
            const _data = await rejectTaskSolution(taskID, userID, comment);
            res.json( { data: _data });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/tasks_api/try_again', async (req, res) => {
        const { taskID, token } = req.body;

        try {
            const _data = await tryTaskAgain(taskID, token);
            res.json( { data: _data });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/tasks_api/get_admin_comment', async (req, res) => {
        const { taskID, token } = req.body;

        try {
            const _adminComment = await getAdminComment(taskID, token);
            res.json( { adminComment: _adminComment });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });
}