const mysql = require('mysql');

let connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_ROOT_HOST,
    port: process.env.MYSQL_PORT,
    user: 'root',
    password: 'root123',
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
});

module.exports = connection;