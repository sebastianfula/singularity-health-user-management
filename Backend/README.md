# Sistema de Gestión de Usuarios

Este proyecto implementa un sistema de gestión de usuarios con arquitectura limpia y GraphQL, permitiendo el registro de usuarios con validación de datos y manejo de relaciones entre entidades.

## Estructura del Proyecto

El proyecto sigue los principios de Arquitectura Limpia:

```
/src
  /domain            # Entidades y reglas de negocio
    /entities        # Modelos de dominio
    /repositories    # Interfaces de repositorios
  /application       # Casos de uso y lógica de aplicación
    /use-cases       # Implementación de casos de uso
    /dto             # Objetos de transferencia de datos
  /infrastructure    # Implementaciones concretas
    /database        # Configuración y modelos de base de datos
    /repositories    # Implementación de repositorios
  /interfaces        # Adaptadores de interfaz
    /graphql         # Resolvers y esquemas GraphQL
    /http            # Configuración de Express
  /config            # Configuraciones generales
  index.js           # Punto de entrada de la aplicación
```

## Modelos de Base de Datos

El sistema gestiona los siguientes modelos:

- **app_user_tb**: Información básica del usuario
- **user_document_tb**: Documentos de identidad del usuario
- **type_document_tb**: Tipos de documentos
- **contact_info_tb**: Información de contacto del usuario
- **country_tb**: Países para la información de contacto

## Requisitos Previos

- Node.js (v14 o superior)
- MySQL (5.7 o superior)

## Configuración de la Base de Datos

### Base de Datos MySQL

La base de datos ya ha sido configurada con los siguientes parámetros:

- **Usuario**: usr_gestion_usuarios
- **Contraseña**: gestion_usuarios123
- **Base de datos**: gestion_usuarios_db
- **Host**: localhost
- **Puerto**: 3306

Los archivos de configuración (.env y config/config.json) ya han sido actualizados con estos datos.

### Inicialización de la Base de Datos

Para inicializar la estructura de la base de datos y cargar los datos iniciales, puede utilizar cualquiera de estos comandos:

```bash
# Opción 1: Usando Sequelize (recomendado para desarrollo)
npm run db:setup

# Opción 2: Ejecutando directamente el script SQL
npm run db:sql
```

El primer comando utiliza Sequelize para crear las tablas y cargar los datos iniciales. El segundo comando ejecuta directamente el archivo SQL de configuración.

## Instalación

1. Clonar el repositorio

```bash
git clone [url-del-repositorio]
cd gestion-usuarios
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gestion_usuarios
DB_USER=postgres
DB_PASSWORD=tu_contraseña
JWT_SECRET=tu_clave_secreta
PORT=4000
```

4. Crear la base de datos

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

## Ejecución

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

## API GraphQL

Una vez iniciado el servidor, puedes acceder al playground de GraphQL en:

```
http://localhost:4000/graphql
```

### Operaciones Principales

- Registro de usuario (con validación de duplicados)
- Consulta de usuarios
- Actualización de información de usuario

## Pruebas

```bash
npm test
```

## Características

- Arquitectura limpia
- API GraphQL
- Validación de datos
- Encriptación de contraseñas
- Prevención de usuarios duplicados
- Relaciones entre entidades