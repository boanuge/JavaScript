var express = require("express")
var serveIndex = require("serve-index");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

// POST 데이터 처리
// ?param=value&param=value 처리를 위해
app.use(bodyParser.urlencoded({ extended: true }));
// 전달된 데이터를 JSON 형식으로 파싱
app.use(bodyParser.json());

// 미들웨어 타임스탬프
var requestTime = function (req, res, next) {
    req.requestTime = new Date().toString();
    next();
}
app.use(requestTime);

// 디렉토리 목록 출력
var path = __dirname + "/static";

app.use("/public", express.static(path)
    , serveIndex(path, { icons: true, view: "details" })
);

// 각각의 패스 라우팅
app.get(/(create|list|done)/, function (req, res) {
    res.send(req.originalUrl + " 호출됨");
    console.log(req.originalUrl + " is called.");
});

// 패스를 통해 값 전달
app.get("/user/:userID/book/:bookID", function (req, res) {
    res.send(req.params);
    console.log("URL = " + req.originalUrl);
    console.log(req.params);
    console.log(req.query);
});

// 서버 포트 리스닝
var server = app.listen(port, function () {
    console.log("Server is listening on port " + port + ".");
});

process.on("SIGINT", function () {
    server.close(function () {
        console.log("Server is closed.");

        // Close db connections
        //db.close();
    });
});

// SQLite3 database
/*
console.log("//SQLite3 DB");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./test_db.db");
db.run("insert into test_db values (?, ?, ?)", ["1", "2", "3"], function () {
    console.log("테스트");
})
db.each("select * from test_db", function (err, row) {
    console.log(row);
});
db.all("select * from test_db", function (err, rows) {
    console.log(rows);
});
db.close();
*/
