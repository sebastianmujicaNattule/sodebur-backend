const ciudadController = require('../controllers/ciudadController');
const passport = require('passport');

module.exports = (app) => {

  
  app.get('/api/ciudad/getAll', passport.authenticate('jwt',{session: false}) , ciudadController.getAll);
  

}