const mysql = require("mysql");
const util = require("util");

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
// });

/* MAMP config for MacBookPro M1 */

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  database: "coffee_house",
  user: "root",
  password: "root",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  port: "8889",
});
// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.error(
        "Now U'll see ENOENT error. You're trying to fetch data fron a Database that´s not connected"
      );
    }
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }

  if (connection) {
    console.log("Connection to DB Ok!");
    connection.release();
    return;
  }
});

pool.query = util.promisify(pool.query);
module.exports = pool;
