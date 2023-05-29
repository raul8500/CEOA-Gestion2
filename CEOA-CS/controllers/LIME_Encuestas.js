const request = require('request');
const conexion = require('../database/db');
const cons = require('consolidate');

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
      const encuestaId = encuesta.id;

      const encontrado = filas.some(fila => fila.id === encuestaId);

      if (!encontrado) {
        jsonResultado.push(encuesta);
      }
    });
  }

  return jsonResultado;
};


exports.asignarEncuestas = async (req, res) => {
  conexion.query('SELECT * FROM asignadasid', (error, filas) => {
    if (error) {
      reject(error);
    } else {
      resolve(filas);
    }
  });

  console.log(req.body)
}

