const User = require('../models/user');
const Rol = require('../models/rol');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
module.exports = {
    login( req , res) {
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser)=> {
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Error con el registro de usuario',
                    error: err
                });
            }
            if (!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El email no existe',
                });
            }
            const isPasswordValid = await bcrypt.compare(password, myUser.password )
            if (isPasswordValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                    id: myUser.id,
                    name: myUser.nombre,
                    lastname: myUser.apellido,
                    email: myUser.email,
                    phone: myUser.telefono,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: JSON.parse(myUser.roles)
                }
                return res.status(201).json({
                    success: true,
                    message: 'El usuario autenticado',
                    data: data // El id del usuario
                })
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'Password incorrecto',
                });
            }            
        })
    },
    register(req, res){
        const user = req.body;
        User.create(user, (err, data)=> {
           
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Error con el registro de usuario',
                    error: err
                });
            }
            
            user.id = `${data}`;
            const token = jwt.sign({id: user.id, email: user.email}, keys.secretOrKey, {});
            user.session_token = token;

            Rol.create(user.id, 1, (err,data) =>{
                if (err){
                    return res.status(501).json({
                        success: false,
                        message: 'Error con el registro del rol de usuario',
                        error: err
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: 'El registro del Rol realizo correctamente',
                    data: user // El id del usuario
                });
            });
            
            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: user // El id del usuario
            });
        });
    },
    update(req, res){
        const user = req.body;
        User.update(user, (err, data)=> {
           
            if (err){
                return res.status(501).json({
                    success: false,
                    message: 'Error con la actualizacion de usuario',
                    error: err
                });
            }           
            return res.status(201).json({
                success: true,
                message: 'El registro se actualizo correctamente',
                data: user // El id del usuario
            });
        });
    }
}