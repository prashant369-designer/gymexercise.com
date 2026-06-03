import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: 'acela.proxy.rlwy.net',
  user: 'root',
  password: 'CysLSzhJsOGzCPQcAfSMqArNeWBgmPks',
  database: 'railway',
  port: 45574,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("Database connected Successfully");

export default connection;
