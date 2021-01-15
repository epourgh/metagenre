const mysql = require('mysql');

let connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_ROOT_HOST,
    port: process.env.MYSQL_PORT,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
});

module.exports = connection;