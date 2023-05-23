const request = require('request');
let sSessionKey = '' // aquí debes usar la clave de sesión que obtuviste previamente

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


exports.encuestas = async (req, res)=>{
    sSessionKey = req.cookies.ss;
    console.log(sSessionKey)
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.send(body)
    });
}
