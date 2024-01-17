const express = require("express");
var path = require("path");
const ejs = require("ejs");
const mysql = require("mysql");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views"));

const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);

var createTable =
  "create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id))";
connection.query(createTable);
connection.end();

app.get("/", (_, res) => {
  const connection = mysql.createConnection(config);

  var sql = `INSERT INTO people(name) values('Otávio')`;
  connection.query(sql);

  sql = `SELECT * FROM people`;

  connection.query(sql, function (err, names) {
    if (err != null) {
      console.log(err);
    }
    return res.render("index", {
      data: names,
    });
  });
  connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta:" + port);
});
