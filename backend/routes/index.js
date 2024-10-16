const mainRoutes = require('./main');
const userDataRoutes = require('./user_data');

module.exports = function (app) {
    mainRoutes(app);
    userDataRoutes(app);
}