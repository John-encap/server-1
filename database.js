const { createPool } = require("mysql");


const pool = createPool({
    port:DB_PORT,
    host:HOST,
    user:USER,
    password:PASSWORD,
    database:MYSQL_DB,
    connectionLimit:10,
})

module.exports = pool;