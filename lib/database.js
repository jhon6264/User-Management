import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'user_management',
};

let connection;

async function createConnection() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database via XAMPP');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export async function query(sql, params) {
  if (!connection) {
    connection = await createConnection();
  }
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}