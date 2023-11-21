const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'sodebur',
    password: 'sodebur2023!',
    database:'sodebur'
});

db.connect(function(err){
    if(err) throw err;
    console.log('Conectado a la BD');
});

module.exports = db;
