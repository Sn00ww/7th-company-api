const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

dbConn.connect((err) => {
    if (err)
        console.log(err);
    else
        console.log('Connected to database "' + process.env.DB_DATABASE + '"');
});

module.exports = dbConn;