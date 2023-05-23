const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')

//Para cerrar la sesion de lime
const request = require('request');
let sSessionKey = '';


const options = {
    method: 'POST',
    url: 'https://raul.limesurvey.net/admin/remotecontrol',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        method: 'release_session_key',
        params: [sSessionKey],
        id: 1,
    }),
};

var SESSIONKEY = "";
var externalSessionKey = null;
var optionsLogin = {
    url: 'https://raul.limesurvey.net/admin/remotecontrol',
    method: "POST",
    headers: {
      'user-agent': 'Apache-HttpClient/4.2.2 (java 1.5)',
      'host': 'raul.limesurvey.net',
      'path': '/index.php/admin/remotecontrol',
      'connection': 'keep-alive',
      'content-type': 'application/json'
    }
};


optionsLogin.body = JSON.stringify({method:'get_session_key',params:['raulperestu','Raulxt914'],id:1});
function getSessionKey(callback) {
    request(optionsLogin, function(error, response, body){
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
  
        //*********KEEP THE KEY*********  
        if(SESSIONKEY === "") {
          //console.log("NEW KEY -->" + body.result);
          SESSIONKEY = body.result;
          callback(SESSIONKEY);
        } 
      }
      else {
        console.log("ERROR -->" + body); 
        callback(null);
      }
    });
  }

exports.login = async (req, res)=>{
  getSessionKey(function(sessionKey) {
    if (sessionKey !== null) {
      externalSessionKey = sessionKey;

      try {
        const user = req.body.user;
        const pass = req.body.pass;

        if(!user || !pass ){
          res.render('login',{
            alert:true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese un usuario y contraseña",
            alertIcon:'info',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
          });
        }else{
          conexion.query('SELECT * FROM users WHERE user_ = ?', [user], async (error, results)=>{
            if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].password_)) ){
              res.render('login', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Usuario y/o contraseña incorrectos",
                alertIcon:'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'    
              });
            }else{
              const id = results[0].id;
              const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                expiresIn: process.env.JWT_TIEMPO_EXPIRA
              });

              const cookiesOptions = {
                expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                httpOnly: true
              };

              res.cookie('jwt', token, cookiesOptions);

              if (externalSessionKey !== null) {
                res.cookie('ss', externalSessionKey, cookiesOptions);
              }

              res.render('login', {
                alert: true,
                alertTitle: "Conexión exitosa",
                alertMessage: "¡LOGIN CORRECTO!",
                alertIcon:'success',
                showConfirmButton: false,
                timer: 800,
                ruta: ''
              });

              console.log('Usuario: '+ user);
              console.log('JWTOKEN: ' + token);
              console.log('LimeToken: ' + externalSessionKey);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No se pudo obtener el SESSIONKEY");
    }
  });
};

exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

exports.isAdmin = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                if(results[0].rol_ == 1){
                    req.user = results[0]
                    return next()
                }
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/')        
    }
}

exports.logout = (req, res)=>{
    sSessionKey = req.cookies.SesionKeyLime

    if(sSessionKey = ''){
        return res.redirect('/')
    }else{
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
        });
    }
    res.clearCookie('ss')     
    res.clearCookie('jwt')

    externalSessionKey = null;
    sSessionKey = ''
    return res.redirect('/')
}

exports.verificaToken = (req, res, next)=> {
    const token = req.cookies.jwt
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETO);
        return next()
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          // token expirado
          res.redirect('/login') 
          console.log('Token expired');
        } else {
          // otro tipo de error
          console.error(err);
        }
      }
}
