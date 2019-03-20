var express = require("express")
var serveIndex = require("serve-index");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;
var path = __dirname + "/";

// POST 데이터 처리
// ?param=value&param=value 처리를 위해
app.use(bodyParser.urlencoded({ extended: true }));
// 전달된 데이터를 JSON 형식으로 파싱
app.use(bodyParser.json());

// 디렉토리 목록 출력
app.use("/", express.static(path), serveIndex(path, {
	icons: true,
	view: "details"
}));

// 서버 포트 리스닝
var server = app.listen(port, function() {
	console.log("Server is listening on port "+ port +".");
});

process.on("SIGINT", function() {
	server.close(function () {
		console.log("Server is closed.");

		// Close db connections
		db.close();
	});
});
