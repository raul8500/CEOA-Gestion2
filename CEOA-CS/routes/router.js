const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

//router para las vistas
router.get('/', authController.isAuthenticated, (req, res)=>{    
    res.render('Main', {user:req.user})
})
router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/register', (req, res)=>{
    res.render('register')
})
router.get('/accesos', authController.isAuthenticated, (req, res)=>{    
    res.render('accesos', {user:req.user})
})
router.get('/monitoreo', authController.isAuthenticated, (req, res)=>{    
    res.render('monitoreo', {user:req.user})
})
router.get('/gestion', authController.isAuthenticated, (req, res)=>{    
    res.render('gestion', {user:req.user})
})



//router para los métodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router