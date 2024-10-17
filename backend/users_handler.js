const users_folder = "./users"
const fs = require('fs');
const path = require('path');

function loadAllUsers() {
    const files = fs.readdirSync(users_folder);
    const jsonMap = new Map();
  
    files.forEach(file => {
        const filePath = path.join(users_folder, file);
        
        if (path.extname(file) === '.json') {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileContent);

            jsonMap.set(jsonData.User.mail, jsonData);
        }
    });
  
    return jsonMap;
}

module.exports = loadAllUsers;