const express = require("express");
const serveIndex = require("serve-index");
const fs = require("fs");
const server = express();
const port = 8888;

server.use(express.json());

//Display static file list in the directory
var path = __dirname + "/static";
server.use("/public", express.static(path)
    , serveIndex(path, { icons: true, view: "details" })
);

var timestamp = require('./time.js');

//Call middleware callback before http method specific callback
server.use(timestamp);

server.get('/', function (req, res) {
    res.send('Got a GET request at /');
});

server.post('/', function (req, res) {
    res.send('Got a POST request at /');
});

server.put('/', function (req, res) {
    res.send('Got a PUT request at /');
});

server.delete('/', function (req, res) {
    res.send('Got a DELETE request at /');
});

server.get('/users', function (req, res) {
    fs.readFile(__dirname + "/user.json", "utf8", function (err, data) {
        console.log(data);
        res.end(data);
    });
});

server.get('/users/:username', function (req, res) {
    fs.readFile(__dirname + "/user.json", "utf8", function (err, data) {
        var users = JSON.parse(data);
        res.json(users[req.params.username]);
    });
});

server.post('/add/:username', function (req, res) {

    var result = {};
    var username = req.params.username;

    //Check request data validity
    if (!req.body["password"] || !req.body["name"]) {
        result["result"] = "failed";
        result["desc"] = "empty";
        res.json(result);
        return;
    }

    //Load JSON data and check duplication by username
    fs.readFile(__dirname + "/user.json", "utf8", function (err, data) {
        var users = JSON.parse(data);
        if (users[username]) { //if exists
            result["result"] = "failed";
            result["desc"] = "duplicated";
            res.json(result);
            return;
        } else { //if not duplicated
            users[username] = req.body;
        }

        //Save JSON data
        fs.writeFile(__dirname + "/user.json"
            , JSON.stringify(users, null, '\t')
            , { encoding: 'utf8', flag: 'w' }, function (err, data) {
                result = { "result": "successful", "value": 1 };
                res.json(result);
            });
    });
});

server.delete('/delete/:username', function (req, res) {

    var result = {};

    //Load JSON data
    fs.readFile(__dirname + "/user.json", "utf8", function (err, data) {

        var users = JSON.parse(data);

        //if not exists
        if (!users[req.params.username]) {
            result["result"] = "failed";
            result["desc"] = "not found";
            res.json(result);
            return;
        } else { //if exists
            delete users[req.params.username];
            fs.writeFile(__dirname + "/user.json"
                , JSON.stringify(users, null, '\t')
                , { encoding: 'utf8', flag: 'w' }, function (err, data) {
                    result["result"] = "successful";
                    res.json(result);
                    return;
                });
        }
    });
})

var callback2 = function (req, res, next) {
    console.log('Got a request at /json');
    next(); //Call next callback function
};

server.all('/json', [callback2], function (req, res) {
    console.log(req.body);
    var result = JSON.stringify({ result: "successful", value: 1 }, null, '\t');
    res.status(200).send(result);
});

server.listen(port, () => console.log('Server is listening on port: ' + port));
