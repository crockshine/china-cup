const path = require('path');

module.exports = function (app) {
    // Маршрут для API запроса
    app.post('/api/data', (req, res) => {
        const requestData = req.body; // Получение данных из запроса
        console.log(requestData); // Логирование на сервере

        // Отправка ответа обратно на клиент
        res.json({ message: 'Данные успешно получены', receivedData: requestData });
    });
}