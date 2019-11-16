var express = require('express')
var app = express()

module.exports = require('./src/app.js');

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/404', function(request, response) {
  response.sendFile(__dirname+ '/views/404.html');
});

app.get('*', function(req, res){
  res.sendFile(__dirname + '/views/404');
});

var listener = app.listen(process.env.PORT, function() {
  console.log('This App Is Listening To Port: ' + listener.address().port);
});

