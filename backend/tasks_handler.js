const tasks_folder = "./tasks"
const fs = require('fs');
const path = require('path');

function loadCurrentTaskID() {
    const files = fs.readdirSync(tasks_folder);
    let output_value = 0;

    files.forEach(file => {
        const filePath = path.join(tasks_folder, file);
        
        if (path.extname(file) === '.json') {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileContent);
            const taskID = jsonData.id;
            
            output_value = Math.max(output_value, taskID);
        }
    });

    return output_value;
}

function listAllTasksInFolder() {
    const files = fs.readdirSync(tasks_folder);
    let output_value = [];

    files.forEach(file => {
        const filePath = path.join(tasks_folder, file);
        
        if (path.extname(file) === '.json') {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileContent);
            const taskID = jsonData.id;

            output_value.push(taskID);
        }
    });

    return output_value;
}

module.exports = { loadCurrentTaskID, listAllTasksInFolder };