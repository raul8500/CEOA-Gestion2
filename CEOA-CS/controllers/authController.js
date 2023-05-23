const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')
const fs = require('fs');

let usuario = ''
let jwtoke = ''
let limetoken = ''

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

function getSessionKey(callback) {
  optionsLogin.body = JSON.stringify({ method: 'get_session_key', params: ['raulperestu', 'Raulxt914'], id: 1 });

  request(optionsLogin, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      callback(body.result);
    } else {
      console.log("ERROR -->" + body);
      callback(null);
    }
  });
}

exports.login = async (req, res) => {
  try {
    const user = req.body.user;
    const pass = req.body.pass;

    if (!user || !pass) {
      return res.render('login', {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y contraseña",
        alertIcon: 'info',
        showConfirmButton: true,
        timer: false,
        ruta: 'login'
      });
    }

    const results = await new Promise((resolve, reject) => {
      conexion.query('SELECT * FROM users WHERE user_ = ?', [user], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length === 0 || !(await bcryptjs.compare(pass, results[0].password_))) {
      return res.render('login', {
        alert: true,
        alertTitle: "Error",
        alertMessage: "Usuario y/o contraseña incorrectos",
        alertIcon: 'error',
        showConfirmButton: true,
        timer: false,
        ruta: 'login'
      });
    }

    const id = results[0].id;
    const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
      expiresIn: process.env.JWT_TIEMPO_EXPIRA
    });

    const cookiesOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true
    };

    res.cookie('jwt', token, cookiesOptions);

    getSessionKey(function (sessionKey) {
      if (sessionKey !== null) {
        res.cookie('ss', sessionKey, cookiesOptions);
      }

      res.render('login', {
        alert: true,
        alertTitle: "Conexión exitosa",
        alertMessage: "¡LOGIN CORRECTO!",
        alertIcon: 'success',
        showConfirmButton: false,
        timer: 800,
        ruta: ''
      });

      const fechaActual = new Date();
      guardarLog(user, fechaActual,token,sessionKey)
    });
  } catch (error) {
    console.log(error);
  }
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


function guardarLog(usuario, fecha,token,sessionKey) {
  const logEntry = `========================\n${fecha}\nUsuario: ${usuario} inició sesión\nLimeToken: ${sessionKey}\nJWToken: ${token}\n========================\n`;
  const filePath = './logs/log.txt';

  fs.appendFile(filePath, logEntry, (err) => {
    if (err) {
      console.error('Error al guardar el registro de inicio de sesión:', err);
    } else {
      console.log('Registro de inicio de sesión guardado exitosamente.');
    }
  });
}



