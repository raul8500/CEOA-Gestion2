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

exports.cerrar = async (req, res) => {
    sSessionKey = req.cookies.SesionKeyLime

    if(sSessionKey = ''){
        return res.redirect('/')
    }else{
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
        });
    }
    res.clearCookie('SesionKeyLime') 
    return res.redirect('/')
    sSessionKey = ''
}