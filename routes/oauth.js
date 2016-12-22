var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.post('/google', function(req, res, next) {

var options = {
  method: 'POST',
  url: 'https://joust-backend.herokuapp.com/oauth/token',

  form: {
          "grant_type" : "google_token",
          "scope" : "read",
          "google_token" : req.get('x-google-token')
        }
};
 
var callback = function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var tokenData = JSON.parse(body);

var meOptions = {
  method: "GET",
  url: 'http://joust-backend.herokuapp.com/rest/me',
  headers : {
    'Authorization' : 'Bearer ' + tokenData.access_token
  }

}
var meCallback = function(error, response, body) {
    res.json(JSON.parse(body));
  }
request(meOptions, meCallback);


}};
request(options, callback).auth('nodejs', 'nodejs', true);


});

module.exports = router;
