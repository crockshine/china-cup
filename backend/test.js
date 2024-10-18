const path = require('path');
const fs = require('fs');

const chats_folder = "./chats"
// вспомогательная функция, просто возвращает путь к файлу задания исходя из ID этой задачи
function getChatFilePath(chatID) {
    return path.join(chats_folder, `chat_${chatID}.json`);
}

function loadChatJSON(chatID) {
    const _path = getChatFilePath(chatID);
    if (!fs.existsSync(_path)) return null;

    const fileContent = fs.readFileSync(_path, 'utf8');
    const chat_jsonData = JSON.parse(fileContent);

    return chat_jsonData;
}

// Функция для обновления данных чата и сохранения изменений в файл
function updateChatJSON(chatID, newChatData) {
    const _path = getChatFilePath(chatID);
  
    // Загружаем существующие данные чата
    let chatData = loadChatJSON(chatID);
  
    // Обновляем данные чата
    chatData = { ...chatData, ...newChatData };
  
    // Сохраняем обновленные данные в файл
    fs.writeFileSync(_path, JSON.stringify(chatData, null, 2));
}

function sendChatMessage(chatID, bySend, messageText) {
    const _path = getChatFilePath(chatID);
    let chatData = loadChatJSON(chatID);

    if (chatData.hasOwnProperty("messages")) {
        const currentMessage = chatData.current_message;

        chatData.current_message = currentMessage + 1;
        chatData.messages[String(currentMessage + 1)] = { "textInOneMsg": messageText, "bySend": bySend };
    
        updateChatJSON(chatID, chatData);
    } 
    else {
        chatData["messages"] = {
            "1": { "textInOneMsg": messageText, "bySend": bySend }
        };
        chatData.current_message = 1;

        // Сохраняем обновленные данные в файл
        fs.writeFileSync(_path, JSON.stringify(chatData, null, 2));
    }
}
  
// Пример использования
const chatID = 3;
sendChatMessage(3, 2, "Хорошо, жду вас!");
  