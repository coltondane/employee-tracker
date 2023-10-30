// .env connection
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the employees database");
});

module.exports = db;
