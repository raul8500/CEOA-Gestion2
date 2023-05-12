var request = require('request');

//******GLOBAL***************
var options = {
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

//*******AUTHENTIFICATION*******
options.body = JSON.stringify({method:'get_session_key',params:['raulperestu','Raulxt914'],id:1});

const requestPromise = options => {
    return new Promise((resolve, reject) => {
      request(options, function(error, response, body) {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(body);
        } else {
          const result = JSON.parse(body);
          resolve(result);
        }
      });
    });
  };
  
exports.ayuda = async (req, res) => {
    let SESSIONKEY = '';
  
    try {
      const result = await requestPromise(options);
  
      //*********KEEP THE KEY*********
  
      if (SESSIONKEY === '') {
        console.log('NEW KEY -->' + result.result);
        SESSIONKEY = result.result;
      }
      res.cookie('SesionKeyLime', SESSIONKEY, {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true
      });
      res.send(result);
    } catch (error) {
      console.log('ERROR -->' + error);
      res.send(error);
    }
  };
  
