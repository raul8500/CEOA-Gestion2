const request = require('request');

exports.encuestas = async (req, res) => {
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
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });
};
