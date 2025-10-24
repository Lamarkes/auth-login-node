
const mysql = require('mysql2/promise');

const config = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'auth_users'
});

module.exports = config;