const path = require('path');
const fs = require('fs');

const { generateRandomDashboard } = require('./dashboard_handler');


const randomDashboard = generateRandomDashboard(); // Генерируем 4 задачи
console.log(JSON.stringify(randomDashboard, null, 2));
  
// Пример использования generateRandomDashboard()