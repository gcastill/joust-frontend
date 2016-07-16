var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.post('/google', function(req, res, next) {

var options = {
  method: 'POST',
  url: 'https://joust-backend.herokuapp.com/oauth/google',
  headers: {
	'x-google-token' : req.get('x-google-token')
  },
  form: { key: 'value' }
};
 
var callback = function(error, response, body) {
  if (!error && response.statusCode == 200) {
  	res.json(JSON.parse(body));
  }
}
 
request(options, callback).auth('nodejs', 'nodejs', true);


});

module.exports = router;
