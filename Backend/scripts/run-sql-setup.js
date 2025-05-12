/**
 * Script para ejecutar el archivo SQL de configuración de la base de datos
 * Este script ejecuta el archivo database_setup.sql en la base de datos MySQL
 */
require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function runSQLSetup() {
  console.log('Ejecutando script SQL de configuración...');
  
  try {
    // Leer el archivo SQL
    const sqlFilePath = path.join(__dirname, '..', 'database_setup.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Conectar a la base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true // Permitir múltiples consultas en una sola ejecución
    });
    
    console.log('Conexión establecida con la base de datos');
    
    // Ejecutar el script SQL
    console.log('Ejecutando script SQL...');
    await connection.query(sqlScript);
    
    console.log('Script SQL ejecutado correctamente');
    
    // Cerrar la conexión
    await connection.end();
    
    console.log('Configuración de la base de datos completada con éxito');
  } catch (error) {
    console.error('Error al ejecutar el script SQL:', error);
    process.exit(1);
  }
}

runSQLSetup();