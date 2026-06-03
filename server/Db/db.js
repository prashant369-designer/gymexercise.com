import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gymstore',
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("Database connected Successfully");

export default connection;