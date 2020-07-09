const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

let connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: process.env.DATABASE_MULTIPLE_STATEMENTS
});

module.exports = connection;