const { listAllUsers } = require('./auth');

const path = require('path');
const fs = require('fs');


const dashboard_data = [
    "Develop a visual concept",
    "Develop a visual concept pt.2",
    "Develop a visual concept pt.3",
    "Implement user authentication",
    "Optimize application performance",
    "Integrate third-party services",
    "Implement state management",
    "Develop a mobile application",
    "Create data visualizations",
    "Implement error handling and logging",
    "Conduct user testing and feedback sessions",
    "Document code and create user manuals"
];


const dashboards_folder = "./dashboards"
// вспомогательная функция, просто возвращает путь к файлу задания исходя из ID этой задачи
function getDashboardFilePath(_id) {
    return path.join(dashboards_folder, `${_id}.json`);
}

function loadDashboardJSON(_id) {
    const _path = getDashboardFilePath(_id);
    if (!fs.existsSync(_path)) return null;

    const fileContent = fs.readFileSync(_path, 'utf8');
    const dashboard_jsonData = JSON.parse(fileContent);

    return dashboard_jsonData;
}

function checkForAllUsers() {
    async function invoke() {
        const usersList = await listAllUsers();
        console.log('users list : ' + usersList);
        usersList.forEach((_id) => {
            const _path = getDashboardFilePath(_id);
            if (!fs.existsSync(_path)) {
                const content = generateRandomDashboard();
                fs.writeFileSync(_path, JSON.stringify(content, null, 2));
            }
        });
    }

    invoke();
}

function generateRandomTime() {
    const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomDashboard() {
    const dashboard = {};
    
    const count = getRandomNumber(2, 12);
    for (let i = 1; i <= count; i++) {
        const randomIndex = Math.floor(Math.random() * dashboard_data.length);
        const taskName = dashboard_data[randomIndex];
        
        dashboard[i] = {
            event: "Solved the task",
            name: taskName,
            time: generateRandomTime()
        };
    }
    
    return dashboard;
}

module.exports = { generateRandomDashboard, checkForAllUsers, loadDashboardJSON }