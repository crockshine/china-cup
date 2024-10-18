const chats_folder = "./chats"
const fs = require('fs');
const path = require('path');

function loadAllChatsInFolder() {
    const files = fs.readdirSync(chats_folder);
    let output_value = [];

    files.forEach(file => {
        const filePath = path.join(chats_folder, file);
        
        if (path.extname(file) === '.json') {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileContent);
            const taskID = jsonData.chat_id;

            output_value.push(taskID);
        }
    });

    return output_value;
}

function indexAllChatsInFolder() {
    const files = fs.readdirSync(chats_folder);
    const output_map = new Map();

    files.forEach(file => {
        const filePath = path.join(chats_folder, file);
        
        if (path.extname(file) === '.json') {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileContent);
            const taskID = jsonData.chat_id;

            jsonData.users.forEach(userID => {
                if (output_map.has(userID)) {
                    output_map.get(userID).push(taskID);
                }
                else {
                    output_map.set(userID, [taskID]);
                }
            });
        }
    });

    return output_map;
}

module.exports = { loadAllChatsInFolder, indexAllChatsInFolder }