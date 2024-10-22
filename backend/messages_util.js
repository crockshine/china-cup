const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

function initializeMessagesUtil(app) {
    // Создаем HTTP сервер
    const server = http.createServer(app);

    // Создаем экземпляр Socket.IO
    const io = socketIo(server);

    // Обработка подключений Socket.IO
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Обработка события 'message'
        socket.on('message', (data) => {
            console.log('Message received: ', data);
            // Можно отправить сообщение обратно всем подключенным клиентам
            io.emit('message', data);
        });

        // Обработка отключения
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}

module.exports = { initializeMessagesUtil };
