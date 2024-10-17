const { tryToLogin, makeSession, getUserName, getUserNickName } = require('./../auth');

module.exports = function (app) {
    app.post('/api/login', async (req, res) => {
        const { userMail, userPassword } = req.body;

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
};
