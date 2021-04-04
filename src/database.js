const mysql = require('mysql');

const { promisify } = require('util');

//Keys
const { database } = require('./lib/keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err)
        throw "database not connected";
    if (connection)
            connection.release();
    console.log('DB connected');
});

pool.query = promisify(pool.query);

module.exports = pool;  
//connection database

