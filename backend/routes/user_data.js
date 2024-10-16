const path = require('path');

module.exports = function (app) {
    // Маршрут для API запроса
    app.post('/api/login', (req, res) => {
        const { userMail, userPassword } = req.body; // Получение данных из запроса

        console.log(userMail + ', ' + userPassword); // Логирование на сервере

        // Отправка ответа обратно на клиент
        //res.json({ message: 'Данные успешно получены', receivedData: requestData });
    });
}