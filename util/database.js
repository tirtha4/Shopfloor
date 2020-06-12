const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3300',
    database:'node-test',
    password:'root'
})

module.exports = pool.promise();