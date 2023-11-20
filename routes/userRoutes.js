const usersController = require('../controllers/usersControllers');
const passport = require('passport');
module.exports = (app) => {

    app.post('/api/users/create', usersController.register);
    app.post('/api/users/login', usersController.login);
    
    app.put('/api/users/update', passport.authenticate('jwt',{session: false}) , usersController.update);
}