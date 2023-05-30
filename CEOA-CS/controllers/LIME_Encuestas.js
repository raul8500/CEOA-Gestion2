const request = require('request');
const conexion = require('../database/db');

exports.encuestas = async (req, res) => {
  try {
    const sSessionKey = req.cookies.ss;
    const options = {
      method: 'POST',
      url: 'https://raul.limesurvey.net/admin/remotecontrol',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'list_surveys',
        params: [sSessionKey],
        id: 1,
      }),
    };

    request(options, async (error, response, body) => {
      if (error) {
        throw new Error(error.message);
      }

      const filas = await obtenerFilas();

      const jsonResultado = filtrarEncuestas(body, filas);

      res.json(jsonResultado);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

const obtenerFilas = () => {
  return new Promise((resolve, reject) => {
    conexion.query('SELECT * FROM asignadasid', (error, filas) => {
      if (error) {
        reject(error);
      } else {
        resolve(filas);
      }
    });
  });
};

const filtrarEncuestas = (body, filas) => {
  const data = JSON.parse(body);
  const jsonResultado = [];

  if (data.result && data.result.length > 0) {
    data.result.forEach(encuesta => {
      const encuestaId = encuesta.sid;
      const encontrado = filas.some(fila => fila.id === encuestaId);
      if (!encontrado) {
        jsonResultado.push(encuesta);
      }
    });
  }
  return jsonResultado;
};

exports.asignarEncuestas = async (req, res) => {
  try {
    const idGrupo = req.body[0].id;
    const sids = req.body;

    let updateSql = "UPDATE groups_ SET noProyect_ = noProyect_ + " + (sids.length - 1) + " WHERE id = " + idGrupo;
    await new Promise((resolve, reject) => {
      conexion.query(updateSql, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    for (let i = 1; i < sids.length; i++) {
      let insertSql = "INSERT INTO asignadasid SET ?";
      let data = { id: sids[i].sid, id_grupo: idGrupo, nombre: sids[i].nombre };
      await new Promise((resolve, reject) => {
        conexion.query(insertSql, data, function(err, result) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
    res.send('Inserciones completadas');
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
}


const obtenerGrupos = (id) =>{
  return new Promise((resolve, reject) => {
    conexion.query('SELECT * FROM asignadasid where id_grupo ='+id, (error,filas)=>{
      if (error) {
        reject(error);
      } else {
        resolve(filas);
      }
    });
  });
}

exports.mostrar = async (req, res)=>{   
  const id = req.params.id
  try {
    const sSessionKey = req.cookies.ss;
    const options = {
      method: 'POST',
      url: 'https://raul.limesurvey.net/admin/remotecontrol',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'list_surveys',
        params: [sSessionKey],
        id: 1,
      }),
    };

    request(options, async (error, response, body) => {
      if (error) {
        throw new Error(error.message);
      }

      const grupos = await obtenerGrupos(id);
      const jsonResultado = filtrarReales(body, grupos);
      res.json(jsonResultado);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }   
}

const filtrarReales = (body, filas) => {
  const data = JSON.parse(body);
  const jsonResultado = [];

  if (data.result && data.result.length > 0) {
    data.result.forEach(encuesta => {
      const encuestaId = encuesta.sid;
      const encontrado = filas.some(fila => fila.id === encuestaId);
      if (encontrado) {
        jsonResultado.push(encuesta);
      }
    });
  }
  return jsonResultado;
};
