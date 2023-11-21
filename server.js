const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
/*
* ROutes
*/

const usersRoutes = require('./routes/userRoutes')
const ciudadRoutes = require('./routes/ciudadRoutes')
 
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use( express.urlencoded({
    urlencoded: true
}));
app.use(cors());
app.use(passport.initialize())
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');
app.set('port', port);

/*
* routes call
*/

usersRoutes(app);
ciudadRoutes(app);

server.listen(3030, 'apisodebur.nattule.com' ||'localhost', function() {
    console.log('Server '+process.pid +' iniciada');
});

app.get('/', (req,res)=>{
    res.send('Root');
});

// ERROR HANDLE

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});
