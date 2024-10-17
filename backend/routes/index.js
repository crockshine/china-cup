const mainRoutes = require('./main');
const homeRoutes = require('./home');
const userDataRoutes = require('./user_data');

module.exports = function (app) {
    mainRoutes(app);
    //homeRoutes(app);
    userDataRoutes(app);
}