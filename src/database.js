const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "containers-us-west-161.railway.app",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "EjpHf7yEAR7BsJ08xoEY",
  database: process.env.DB_NAME || "railway",
  port: process.env.DB_PORT || 7455
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Conection succeed.');
  }
})

module.exports = connection;