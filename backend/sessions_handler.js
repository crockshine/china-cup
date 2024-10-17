const sessions_folder = "./sessions"
const fs = require('fs');
const path = require('path');

function loadCurrentSessionID() {
    const files = fs.readdirSync(sessions_folder);
    let output_value = 0;

    files.forEach(file => {
        const filePath = path.join(sessions_folder, file);
        
        if (path.extname(file) === '.json') {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileContent);
            const sessionID = jsonData.id;
            
            output_value = Math.max(output_value, sessionID);
        }
    });

    return output_value;
}

module.exports = loadCurrentSessionID;