# Instrucciones para Ejecutar el Sistema de Gestión de Usuarios

## Configuración Actual

El sistema está configurado para utilizar la base de datos MySQL con los siguientes parámetros:

- **Usuario**: usr_gestion_usuarios
- **Contraseña**: gestion_usuarios123
- **Base de datos**: gestion_usuarios_db
- **Host**: localhost
- **Puerto**: 3306

## Pasos para Ejecutar el Sistema

### 1. Verificar la Instalación de Dependencias

Asegúrese de tener todas las dependencias instaladas:

```bash
npm install
```

### 2. Inicializar la Base de Datos

Puede inicializar la base de datos de dos formas:

#### Opción 1: Usando Sequelize (recomendado para desarrollo)

```bash
npm run db:setup
```

Este comando utiliza Sequelize para crear las tablas y cargar los datos iniciales.

#### Opción 2: Ejecutando directamente el script SQL

```bash
npm run db:sql
```

Este comando ejecuta directamente el archivo SQL de configuración.

### 3. Iniciar la Aplicación

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
```

Para iniciar la aplicación en modo producción:

```bash
npm start
```

La aplicación estará disponible en http://localhost:4000/graphql

## Verificación de la Configuración

Para verificar que la aplicación está utilizando la configuración correcta de la base de datos, puede revisar los siguientes archivos:

- `.env`: Contiene las variables de entorno para la conexión a la base de datos
- `config/config.json`: Contiene la configuración de Sequelize para los diferentes entornos

## Solución de Problemas

Si encuentra problemas al conectarse a la base de datos, verifique:

1. Que el servidor MySQL esté en ejecución
2. Que el usuario `usr_gestion_usuarios` tenga los permisos correctos sobre la base de datos `gestion_usuarios_db`
3. Que la contraseña `gestion_usuarios123` sea correcta
4. Que la base de datos `gestion_usuarios_db` exista

Si necesita recrear el usuario y la base de datos, puede ejecutar los siguientes comandos en MySQL:

```sql
DROP USER IF EXISTS 'usr_gestion_usuarios'@'localhost';
CREATE USER IF NOT EXISTS 'usr_gestion_usuarios'@'localhost' IDENTIFIED BY 'gestion_usuarios123';
CREATE DATABASE IF NOT EXISTS gestion_usuarios_db;
GRANT ALL PRIVILEGES ON gestion_usuarios_db.* TO 'usr_gestion_usuarios'@'localhost';
FLUSH PRIVILEGES;
```