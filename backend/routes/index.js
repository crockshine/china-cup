const mainRoutes = require('./main');
const homeRoutes = require('./home');
const messengerDataRoutes = require('./messenger_data');
const userDataRoutes = require('./user_data');
const tasksDataRoutes = require('./tasks_data');

module.exports = function (app) {
    mainRoutes(app);
    //homeRoutes(app);
    messengerDataRoutes(app);
    userDataRoutes(app);
    tasksDataRoutes(app);
}