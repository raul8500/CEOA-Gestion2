const conexion = require('../database/db')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


//Mostrar
exports.mostrar = async (req, res)=>{    
    try {
        const token = req.cookies.jwt;
        console.log(token);
        const verify = await jwt.verify(token,process.env.JWT_SECRETO)
        conexion.query('SELECT * FROM users WHERE id = ?',verify.id, function (error,filas){
            if(error){
                throw error
            }else{
                res.send(filas)
            }
        })
    } catch (error) {
        console.log(error)
    }       
}