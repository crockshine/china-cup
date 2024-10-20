const jwt = require('jsonwebtoken');
const JWT_SECRET = 'goida'; // Ваш секретный ключ

// Middleware для проверки аутентификации через куки
function authMiddleware(req, res, next) {
    const token = req.cookies.token; // Ищем токен в куки
    console.log('токен в midware: ' + token);
    if (!token) {
        return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
    }

    try {
        // Верифицируем токен
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Сохраняем информацию о пользователе в запросе
        next(); // Переходим к следующему обработчику
    } catch (err) {
        console.error('Ошибка при верификации токена:', err.message);
        return res.status(403).json({ message: 'Неверный токен' });
    }
}

module.exports = authMiddleware;
