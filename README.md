# Sistema de Gestión de Usuarios - Singularity Health

Este repositorio contiene un sistema completo de gestión de usuarios desarrollado para Singularity Health, implementado como un monorepo que incluye tanto el backend como el frontend de la aplicación.

## Estructura del Proyecto

El proyecto está organizado como un monorepo con la siguiente estructura:

```
GestionUsuarios/
├── Backend/           # Aplicación de servidor (Node.js, Express, GraphQL, Sequelize)
│   ├── src/
│   │   ├── application/     # Casos de uso
│   │   ├── domain/          # Entidades y reglas de negocio
│   │   ├── infrastructure/  # Implementaciones técnicas (base de datos, etc.)
│   │   └── interfaces/      # API GraphQL y otros puntos de entrada
│   ├── config/          # Configuración de la aplicación
│   └── scripts/         # Scripts de utilidad
│
├── Frontend/          # Aplicación cliente (React, TypeScript, Apollo Client)
│   ├── src/
│   │   ├── application/     # Lógica de aplicación
│   │   ├── domain/          # Modelos y reglas de negocio
│   │   ├── infrastructure/  # Implementaciones técnicas (GraphQL, etc.)
│   │   └── presentation/    # Componentes de UI y páginas
│   └── public/          # Archivos estáticos
│
└── .gitignore         # Configuración global de Git
```

## Tecnologías Utilizadas

### Backend
- **Node.js y Express**: Para el servidor web
- **GraphQL con Apollo Server**: Para la API
- **Sequelize ORM**: Para interacción con la base de datos
- **MySQL**: Como sistema de gestión de base de datos
- **Arquitectura Hexagonal**: Para organización del código

### Frontend
- **React**: Biblioteca para construcción de interfaces
- **TypeScript**: Para tipado estático
- **Apollo Client**: Para consumo de API GraphQL
- **Tailwind CSS**: Para estilos
- **Vite**: Como herramienta de construcción

## Funcionalidades Principales

- Registro de usuarios con validación
- Gestión de documentos de identidad
- Gestión de información de contacto
- Validación de duplicados (username, email, documento)
- Consulta de usuarios y datos relacionados

## Requisitos Previos

- Node.js (v14 o superior)
- MySQL (v8 o superior)
- npm o yarn

## Instalación y Configuración

### Configuración de la Base de Datos

1. Crear una base de datos MySQL
2. Ejecutar el script de configuración:

```bash
cd Backend
npm install
node scripts/run-sql-setup.js
```

### Backend

1. Navegar al directorio del backend:

```bash
cd Backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno (crear archivo .env basado en el ejemplo):

```
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=nombre_base_datos
DB_HOST=localhost
DB_DIALECT=mysql
PORT=4000
```

4. Iniciar el servidor:

```bash
npm start
```

El servidor GraphQL estará disponible en http://localhost:4000/graphql

### Frontend

1. Navegar al directorio del frontend:

```bash
cd Frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:5173

## Documentación Adicional

Para más detalles sobre cada componente del sistema, consulte los archivos README.md específicos en los directorios Backend y Frontend.

## Contribución

1. Hacer fork del repositorio
2. Crear una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Hacer commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Hacer push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.