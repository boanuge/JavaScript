/**
 * @TODO
 * 1) 각각 다음 항목에 대한 라우팅을 작성하라.
 *    그리고 응답 메세지로 "${라우팅명} 호출됨" 이라고 처리하라.
 *    - create
 *    - list
 *    - done
 *
 * 2) 다음의 값을 전달 받을 수 있는 Router parameter를 작성하라.
 *    { "type": "문자열", "number": 숫자 }
 *
 * 3) /time 라우팅에서 time이 출력되는 미들웨어를 작성하라.
 *
 * 4) body-parser를 설정하고, /post 라우팅에서 form.html로 부터 전달되는 값을 출력하라.
 *
 * 5) '/template' 라우팅을 작성하고, title, message, content가 출력되는 템플릿을 작성하라.
 *
 * 6) 모든 디렉토리의 파일 내용이 출력되도록 server-index를 설정하라.
 */

const express = require("express");
const app = express();
const port = 3000;

//ToDo:3)
var requestTime = function(req, res, next) {
	req.requestTime = new Date().toString();
	next();
}

app.use(requestTime);

app.get("/", function(req, res) {
	res.send("Current Time = " + req.requestTime);
});

//ToDo:1)
app.get(/(create|list|done)/, function(req, res) {
	res.send(req.originalUrl + " 호출됨");
	console.log(req.originalUrl + " is called.");
});

//ToDo:2)
app.get("/user/:userID/book/:bookID", function(req, res) {
	res.send(req.params);
	console.log("URL = " + req.originalUrl);
	console.log(req.params);
	console.log(req.query);
});

//ToDo:4)
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post("/post", function(req, res) {
	var body = req.body;

	console.log(body);
	res.send("OK");
});

//ToDo:5)
app.set("view engine", "pug");
app.get("/template", function(req, res) {
	res.render("json_view", {title:"Hi", message:"Hello There", content:"Content is here"})
});

//ToDo:6)
var serveIndex = require("serve-index");

app.use("/", express.static(__dirname + "/"), serveIndex(__dirname + "/", {icons: true}));

app.listen(port, function() {
	console.log("Example app listening on port "+ port +"!");
});

//ToDo:SQLite3
/*
console.log("//ToDo:SQLite3");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./test_db.db");

db.run("insert into test_db(message) values (?)", "테스트", function() {
	console.log("테스트");
})
db.each("select * from test_db", function(err, row) {
	console.log(row);
});

db.close();
*/
