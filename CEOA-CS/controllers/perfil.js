const conexion = require('../database/db')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


//Mostrar
exports.mostrar = async (req, res)=>{    
    try {
        const token = req.cookies.jwt;
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

//Editar 
exports.editar = async (req, res)=>{    

    const token = req.cookies.jwt;
    const verify = await jwt.verify(token,process.env.JWT_SECRETO)

    let name = req.body.name
    let lastname = req.body.lastname
    let email = req.body.email
    let user = req.body.user

    let sql = "UPDATE users SET names_ = ?, lastnames_ = ?, email_ = ?, user_ = ? WHERE id = ?"
    conexion.query(sql, [name, lastname, email, user,verify.id], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
}

//Editar Password
exports.password = async (req, res)=>{    
    const token = req.cookies.jwt;
    const verify = await jwt.verify(token,process.env.JWT_SECRETO)
    let passHash = await bcryptjs.hash(req.body.pass, 4)  
    let sql = "UPDATE users SET password_ = ? WHERE id = ?"
    conexion.query(sql, [passHash,verify.id], function(error, results){
        if(error){
            throw error
        }else{              
            res.send(results)
        }
    })
}