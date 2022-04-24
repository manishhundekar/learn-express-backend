const mysql = require("mysql")

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Root@2022", //my-secret-pw
    database: "users"
})

/* const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "password",
    database: "lab"
}) */

/* const connection = mysql.createConnection({
    host: 'localhost',
    user: 'thewxfaf_vbpharma',
    password: "vbpharma@123",
    database: "thewxfaf_vbpharma"
}) */

module.exports = connection;