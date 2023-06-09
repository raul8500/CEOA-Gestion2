const conexion = require('../database/db')
const bcryptjs = require('bcryptjs')

//Primer Acercamiento
exports.mostrar = async (req, res)=>{    
    try {
        conexion.query('SELECT * FROM primerAcercamiento where idPro = ?', [req.params.id], (error,filas)=>{
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
exports.mostrarPrimerInvividual = async (req, res)=>{    
    try {
        conexion.query('SELECT * FROM primerAcercamiento where idPrimer = ?', [req.params.id], (error,filas)=>{
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
    let data = {idPro:req.body.idPro_, nombrePrimer:req.body.nombrePrimer_}
    let sql = "INSERT INTO primeracercamiento SET ?"
    conexion.query(sql, data, function(err, result){
        if(err){
            throw err
         }
    })
}

//Oficio y responsable
exports.mostrarOficio = async (req, res)=>{    
    try {
        conexion.query('SELECT * FROM oficioresponsable where idPro = ?', [req.params.id], (error,filas)=>{
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