const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const accesos = require('../controllers/accesos')
const gestion = require('../controllers/gestion')
const perfil = require('../controllers/perfil')
const lime = require('../controllers/LIME_Encuestas')
const { liquid } = require('consolidate')


//router para las vistas
router.get('/', authController.isAuthenticated, authController.verificaToken, (req, res)=>{    
    res.render('Main', {user:req.user})
})
router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/gestion',authController.isAuthenticated,authController.isAdmin, (req, res)=>{
    res.render('gestion', {alert:false})
})
router.get('/accesos', authController.isAuthenticated, authController.isAdmin, (req, res)=>{    
    res.render('accesos', {user:req.user})
})
router.get('/verGrupos', authController.isAuthenticated, authController.isAdmin, (req, res)=>{    
    res.render('verGrupos', {user:req.user})
})
router.get('/perfil', authController.isAuthenticated, authController.isAdmin, (req, res)=>{    
    res.render('perfil', {user:req.user})
})


//Rutas lime
router.get('/api/lime/encuestas',lime.encuestas )

//Rutas Auth
router.post('/login',authController.login)
router.get('/logout', authController.logout)

//Rutas Accesos
router.get('/api/accesos/',authController.isAuthenticated,accesos.mostrar)
router.delete('/api/accesos/:id',authController.isAuthenticated ,accesos.delete)
router.post('/api/accesos/crear',authController.isAuthenticated ,accesos.crear)
router.put('/api/accesos/editar/:id',authController.isAuthenticated ,accesos.editar)

//Rutas Grupos
router.get('/api/grupos/',authController.isAuthenticated,gestion.mostrarGrupos)
router.post('/api/grupos/crear',authController.isAuthenticated ,gestion.crear)

//Rutas Perfil
router.get('/api/perfil/',authController.isAuthenticated,perfil.mostrar)
router.put('/api/perfil/actualizar/',authController.isAuthenticated,perfil.editar)
router.put('/api/perfil/actualizarPass/',authController.isAuthenticated,perfil.password)


module.exports = router