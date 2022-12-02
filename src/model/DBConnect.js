const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Weak",
    database: "Students",
    port: 3306
});

module.exports = connection;
