const createPool = require('mysql');

const pool = createPool.createConnection({
    port: process.env.DB_PORT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
});

// const pool = createPool.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "bloomfield"
// });


module.exports = pool;