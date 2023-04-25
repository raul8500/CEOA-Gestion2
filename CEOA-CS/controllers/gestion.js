const conexion = require('../database/db')

exports.mostrarGrupos = async (req, res)=>{    
    try {
        conexion.query('SELECT * FROM groups_', (error,filas)=>{
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
    let data = req.body.nameGroup
    //let dota = {nameGroup_:req.body.nameGroup, noProyect_:req.body.noProyect,state_:req.}
    let sql = "INSERT INTO groups_ (nameGroup_, noProyect_, state_, date_I, dateF) VALUES (?, 0, 1, CURRENT_DATE(), null)"
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