const Ciudad = require('../models/ciudad');

module.exports = {
    getAll(req, res){

        Ciudad.getAll( async ( err, data ) => {
            if (err){
            return res.status(501).json({
                    success: false,
                    message: 'Error con la consulta',
                    error: err
                });
            }

            return res.status(201).json(data)
        })
    }
}