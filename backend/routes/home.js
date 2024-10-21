const path = require('path');

module.exports = function (app) {
    app.get('/home', authMiddleware, (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
    /*app.get('/api', (req, res) => {
        res.json({ message: 'Hello from API' });
    });*/
}