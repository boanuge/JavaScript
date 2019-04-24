// [LOAD PACKAGES]
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var server = express();

// [CONFIGURE mongoose]
//Connect to MongoDB Server
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    //Connected to MongoDB Server
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/mongodb_tutorial'
    , { useNewUrlParser: true });

//Modeling the document schema
var BookSchema = require('./dbSchema.js');

// [CONFIGURE SERVER TO USE bodyParser]
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [CONFIGURE ROUTER]
var router = require('./urlPath.js')(server, BookSchema);

// [RUN SERVER]
var server = server.listen(port, function () {
    console.log("Express server has started on port " + port)
});
