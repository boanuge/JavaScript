const express = require('express');
const serveIndex = require("serve-index");
const server = express();
const port = 3000;

server.use(express.json());

var timestamp = require('./time.js');

//Display static file list in the directory
var path = __dirname + "/static";
server.use("/public", express.static(path)
    , serveIndex(path, { icons: true, view: "details" })
);

//middleware callback before calling http method specific callback
server.use(timestamp);

server.get('/', function (req, res) {
    res.send('Got a GET request at /');
});

server.post('/', function (req, res) {
    res.send('Got a POST request at /');
});

server.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

server.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});

var callback1 = function (req, res, next) {
    res.send('Got a request at /secret');
    next();
};

var callback2 = function (req, res) {
    console.log('Got a request at /secret');
};

server.all('/secret', [callback1, callback2]);

server.all('/json', function (req, res) {

    console.log(req.body);

    var result = JSON.stringify({ name: "1", id: 1 }, null, '\t');
    res.send(result);
});

server.listen(port, () => console.log('Server is listening on port: ' + port));
