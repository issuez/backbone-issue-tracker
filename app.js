var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var fs = require('fs');
var path = require('path');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

var tasks = [];

app.get('/tasks/:id', function (req, res) {
  var id = req.params.id;
  res.send(JSON.stringify({value : tasks[id]}));
});

app.get('/tasks', function (req, res) {
  console.log('getting tasks');
  // res.send(JSON.stringify({value : tasks[id]}));
  res.send(req.body);
  console.log(req.body);
});


app.put('/tasks/:id', function (req, res) {
  var id = req.params.id;
  tasks[id] = req.body.value;
  res.send({id: 1});
});

app.get('/login/1', function (req, res) {
  console.log('Logging in route');
  // res.sendFile(path.join(__dirname, '/public/login'));
  res.send(JSON.stringify({value: tasks}));
});

app.put('/login/1', function (req, res) {
    console.log(req.body);
    //  = req.body.value;
    // res.end();
    res.send({id : "1"});
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
