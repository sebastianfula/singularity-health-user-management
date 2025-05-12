require('dotenv').config();
const { Sequelize } = require('sequelize');
const { exec } = require('child_process');
const { sequelize, models } = require('../src/infrastructure/database/config');

// Verificar que estamos usando la base de datos correcta
console.log('Configuración de base de datos:', {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER
});

/**
 * Script para configurar la base de datos MySQL para el sistema de gestión de usuarios
 * Este script realiza las siguientes tareas:
 * 1. Crea la base de datos si no existe
 * 2. Ejecuta las migraciones
 * 3. Inserta datos iniciales necesarios para el funcionamiento del sistema
 */
async function setupMySQLDatabase() {
  console.log('Iniciando configuración de la base de datos MySQL...');

  try {
    // Paso 1: Verificar conexión a MySQL
    console.log('Verificando conexión a MySQL...');
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    // Paso 2: Crear la base de datos (usando Sequelize CLI)
    console.log('Creando base de datos si no existe...');
    await new Promise((resolve, reject) => {
      exec('npx sequelize-cli db:create', (error, stdout, stderr) => {
        if (error && !error.message.includes('already exists')) {
          console.error(`Error al crear la base de datos: ${error.message}`);
          reject(error);
          return;
        }
        console.log(stdout || 'Base de datos ya existe o ha sido creada.');
        resolve();
      });
    });

    // Paso 3: Ejecutar migraciones
    console.log('Ejecutando migraciones...');
    await new Promise((resolve, reject) => {
      exec('npx sequelize-cli db:migrate', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar migraciones: ${error.message}`);
          reject(error);
          return;
        }
        console.log(stdout || 'Migraciones ejecutadas correctamente.');
        resolve();
      });
    });

    // Paso 4: Insertar datos iniciales
    console.log('Insertando datos iniciales...');
    
    // Insertar tipos de documento si no existen
    const tiposDocumento = [
      { nameTypeDocument: 'Cédula de Ciudadanía' },
      { nameTypeDocument: 'Cédula de Extranjería' },
      { nameTypeDocument: 'Tarjeta de Identidad' },
      { nameTypeDocument: 'Pasaporte' }
    ];

    for (const tipo of tiposDocumento) {
      const [tipoDoc, created] = await models.TypeDocument.findOrCreate({
        where: { nameTypeDocument: tipo.nameTypeDocument },
        defaults: tipo
      });
      
      if (created) {
        console.log(`Tipo de documento creado: ${tipo.nameTypeDocument}`);
      } else {
        console.log(`Tipo de documento ya existe: ${tipo.nameTypeDocument}`);
      }
    }

    // Insertar países si no existen
    const paises = [
      { countryCode: 'CO', countryName: 'Colombia' },
      { countryCode: 'US', countryName: 'Estados Unidos' },
      { countryCode: 'ES', countryName: 'España' },
      { countryCode: 'MX', countryName: 'México' },
      { countryCode: 'AR', countryName: 'Argentina' }
    ];

    for (const pais of paises) {
      const [paisDoc, created] = await models.Country.findOrCreate({
        where: { countryCode: pais.countryCode },
        defaults: pais
      });
      
      if (created) {
        console.log(`País creado: ${pais.countryName}`);
      } else {
        console.log(`País ya existe: ${pais.countryName}`);
      }
    }

    console.log('Configuración de la base de datos MySQL completada con éxito.');
  } catch (error) {
    console.error('Error durante la configuración de la base de datos:', error);
    process.exit(1);
  } finally {
    // Cerrar la conexión
    await sequelize.close();
  }
}

// Ejecutar la configuración
setupMySQLDatabase();