import { config } from "dotenv";
import { createConnection } from "mysql2";

config();

const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Conectado ao MySQL com sucesso!");
});

export default connection;
