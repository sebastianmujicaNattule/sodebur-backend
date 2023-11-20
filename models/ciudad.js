const { json } = require('express');
const db = require('../config/config');

const Ciudad = {}

Ciudad.getAll =(result)=>{
    
    const sql = `
        SELECT id, nombre
        FROM ciudad`;

    db.query(
        sql,
        (err, data) => {
            if (err){
                console.log('Error en la Consulta', err);
                result(err, null);
            }else{
                result(null, data);
            }
         }
    )
}

module.exports = Ciudad;
