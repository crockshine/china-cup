const { listAllUsers } = require('./auth');

const dashboard_data = [
    "Develop a visual concept",
    "Develop a visual concept pt.2",
    "Develop a visual concept pt.3",
    "Algorithms",
    "Working with databases",
    "Implement user authentication",
    "Create a RESTful API",
    "Design a responsive UI",
    "Optimize application performance",
    "Write unit tests",
    "Integrate third-party services",
    "Conduct code reviews",
    "Set up CI/CD pipeline",
    "Implement state management",
    "Develop a mobile application",
    "Create data visualizations",
    "Implement error handling and logging",
    "Refactor legacy code",
    "Conduct user testing and feedback sessions",
    "Document code and create user manuals"
];

function checkForAllUsers() {
    async function invoke() {
        const usersList = await listAllUsers();
        console.log(usersList);
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
            event: "Added new tasks",
            name: taskName,
            time: generateRandomTime()
        };
    }
    
    return dashboard;
}

module.exports = { generateRandomDashboard, checkForAllUsers }