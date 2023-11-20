const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'sodebur2023!',
    password: 'sodebur2023!',
    database:'sodebur'
});

db.connect(function(err){
    if(err) throw err;
    console.log('Conectado a la BD');
});

module.exports = db;
