const conexion = require('../database/db')
const bcryptjs = require('bcryptjs')

//Mostrar
exports.mostrar = async (req, res)=>{    
    try {
        conexion.query('SELECT * FROM proyectos', (error,filas)=>{
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

//Crear usuario
exports.crear = async (req, res)=>{

    let data = req.body.nombreProyecto_
    let sql = "INSERT INTO proyectos (nombreProyecto, estado, fechaInicio) VALUES (?, 1, CURRENT_DATE())"
    conexion.query(sql, data, function(err, result){
        if(err){
           throw err
        }
})
}

//Editar articulo
exports.editar = async (req, res)=>{    

    let id = req.params.id
    let name = req.body.name
    let lastname = req.body.lastname
    let email = req.body.email
    let rol =req.body.rol
    let user = req.body.user

    let sql = "UPDATE users SET names_ = ?, lastnames_ = ?, email_ = ?, rol_ = ?, user_ = ? WHERE id = ?"
    conexion.query(sql, [name, lastname, email, rol, user, id], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
}
//Eliminar articulo
exports.delete = async (req, res)=>{    
    conexion.query('DELETE FROM proyectos WHERE idPro = ?', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
}

