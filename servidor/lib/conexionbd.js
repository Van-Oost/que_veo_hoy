var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "localhost",
  port     : "3306",
  user     : "root",
  password : "Guachimorro1",
  database : "queveo"
});

module.exports = connection;

