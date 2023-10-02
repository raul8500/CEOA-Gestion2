const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

//Primer Acercamiento
exports.mostrar = async (req, res)=>{    
    try {
        conexion.query('SELECT np.idNotas, np.idPrimer, np.idUser, np.nota, u.names_ AS userName FROM sgp.notasprimer np INNER JOIN users u ON np.idUser = u.id WHERE np.idPrimer = ?', [req.params.id], (error,filas)=>{
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

exports.crear = async (req, res)=>{
    const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
    let data = {idPrimer:req.body.idPrimer_, idUser:decodificada.id, nota:req.body.nota_}
    let sql = "INSERT INTO notasprimer SET ?"
    conexion.query(sql, data, function(err, result){
            if(err){
               throw err
            }else{              
             /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
             Object.assign(data, {id: result.insertId }) //agregamos el ID al objeto data             
             res.send(data) //enviamos los valores                         
        }
    })
}