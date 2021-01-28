const mysql = require('mysql');

let connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_ROOT_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
});

module.exports = connection;