const db = require('../config/config');
const bcrypt = require('bcryptjs');
const User = {};
User.findById = (id, result)  =>{
    const sql = `
        SELECT
        U.id,
        U.email,
        U.nombre,
        U.apellido,
        U.telefono,
        U.image,
        U.password,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(R.id, char) ,
                'name',R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM
        users as U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles as R
    ON
        R.id = UHR.id_rol
    WHERE
        U.id = ?

    `;
    db.query(
        sql,
        [id],
        (err,user) => {
            if (err){
                console.log('Error', err);
                result(err, null);
            }else{
                console.log('Usuario', user[0]);
                result(null, user[0]);
            }
        }
        )
}
User.findByEmail = (email, result)  =>{
    const sql = `
        SELECT
        U.id,
        U.email,
        U.nombre,
        U.apellido,
        U.telefono,
        U.image,
        U.password,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name',R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM
        users as U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles as R
    ON
        R.id = UHR.id_rol
    WHERE
        email = ?

    `;
    db.query(
        sql,
        [email],
        (err,user) => {
            if (err){
                console.log('Error', err);
                result(err, null);
            }else{
                console.log('Usuario', user[0])
                result(null, user[0]);
            }
        }
        )
}
User.create = async ( user, result ) =>{

    const hash = await bcrypt.hash(user.password, 10);
    const sql = `
        INSERT INTO
            users(
                email,
                nombre,
                apellido,
                telefono,
                image,
                password,
                created_at,
                updated_at
            )
        VALUES(?,?,?,?,?,?,?,?)
    `;
    db.query(
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err,res) => {
            if (err){
                console.log('Error', err);
                result(err, null);
            }else{
                console.log('Id de usuario', res.insertId)
                result(null, res.insertId);
            }
        }
    )
}

User.update = ( user, result) => {

    const sql = `
        UPDATE
            users
        SET
            nombre = ?,
            apellido = ?,
            telefono = ?,
            updated_at = ?
        WHERE
            id = ?
    `;
    db.query(
        sql,
        [
            user.name,
            user.lastname,
            user.phone,
            new Date(),
            user.id
        ],
        (err,res) => {
            if (err){
                console.log('Error', err);
                result(err, null);
            }else{
                console.log('usuario actualizado', user.id)
                result(null, user.id);
            }
        }
    )
}
module.exports = User;