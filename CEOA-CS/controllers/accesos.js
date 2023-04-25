const conexion = require('../database/db')
const bcryptjs = require('bcryptjs')


//Mostrar
exports.mostrar = async (req, res)=>{    
    try {
        conexion.query('SELECT * FROM users', (error,filas)=>{
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

//Eliminar articulo
exports.delete = async (req, res)=>{    
    conexion.query('DELETE FROM users WHERE id = ?', [req.params.id], function(error, filas){
        if(error){
            throw error
        }else{              
            res.send(filas)
        }
    })
}

//Crear usuario
exports.crear = async (req, res)=>{

    let passHash = await bcryptjs.hash(req.body.pass, 4)  
    let data = {names_:req.body.name, lastnames_:req.body.lastname, email_:req.body.email, rol_:req.body.rol, user_:req.body.user, password_:passHash}
    let sql = "INSERT INTO users SET ?"
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



