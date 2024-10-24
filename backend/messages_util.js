const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const userSockets = {};
function initializeMessagesUtil(app) {
    // Создаем HTTP сервер
    const server = http.createServer(app);

    // Создаем экземпляр Socket.IO
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:3001", // Укажите ваш клиентский адрес
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type"],
            credentials: true
        }
    });

    // Обработка подключений Socket.IO
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Сохранение сокета пользователя (например, по его ID)
        socket.on('msgcenter_register', (userId) => {
            userSockets[userId] = socket.id;
            console.log(`User registered: ${userId}`);
        });


        // Обработка события 'message'
        socket.on('msgcenter_message', (data) => {
            console.log('Message received: ', data);
        
            const { token, chatID } = data;
            
            // Отправка сообщения конкретному пользователю
            const recipientSocketId = userSockets[recipientId];
            if (recipientSocketId) {
                io.to(recipientSocketId).emit('msgcenter_update_messages', { from: fromUserID });
            }
        });


        // Обработка отключения
        socket.on('disconnect', () => {
            console.log('User disconnected');
            // Удаление сокета из объекта при отключении
            for (const userId in userSockets) {
                if (userSockets[userId] === socket.id) {
                    delete userSockets[userId];
                    break;
                }
            }
        });
    });
}

module.exports = { initializeMessagesUtil };
