# Frontend - Sistema de Gestión de Usuarios

Este proyecto implementa la interfaz de usuario para el Sistema de Gestión de Usuarios, permitiendo el registro de usuarios con validación de datos y prevención de duplicados.

## Tecnologías Utilizadas

- React 19
- TypeScript
- Apollo Client para GraphQL
- Tailwind CSS para estilos
- React Hook Form para manejo de formularios
- Yup para validación de datos

## Arquitectura

El proyecto sigue una arquitectura limpia con separación de responsabilidades:

- **Domain**: Contiene los modelos y entidades del negocio
- **Application**: Contiene la lógica de aplicación y casos de uso
- **Infrastructure**: Contiene la implementación de servicios externos como GraphQL
- **Presentation**: Contiene los componentes de UI y páginas

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm (versión 9 o superior)

## Instalación

1. Clonar el repositorio
2. Navegar al directorio del frontend:

```bash
cd GestionUsuarios/Frontend
```

3. Instalar dependencias:

```bash
npm install
```

## Configuración

El proyecto ya viene configurado para conectarse al backend GraphQL. Si necesitas modificar la URL del servidor GraphQL, puedes hacerlo en el archivo de configuración de Apollo Client.

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto iniciará la aplicación en modo desarrollo y estará disponible en [http://localhost:5173](http://localhost:5173).

## Compilación para Producción

Para compilar la aplicación para producción:

```bash
npm run build
```

Los archivos compilados se generarán en el directorio `dist`.

## Características Principales

### Registro de Usuarios

El sistema permite registrar nuevos usuarios con los siguientes datos:

- Información personal (nombre, apellidos, email)
- Credenciales (nombre de usuario, contraseña)
- Documento de identidad (tipo y número)
- Información de contacto (dirección, país, teléfono)

El formulario incluye validaciones para:

- Campos obligatorios
- Formato de email válido
- Contraseña segura
- Prevención de usuarios duplicados

### Integración con Backend

La aplicación se integra con el backend mediante GraphQL, utilizando:

- Queries para obtener datos (tipos de documento, países)
- Mutations para enviar datos (registro de usuario)

## Estructura de Componentes

- **UI Components**: Componentes reutilizables como Button, Input, Select
- **Pages**: Páginas completas como RegisterPage
- **Hooks**: Lógica de negocio encapsulada como useRegisterForm

## Estilos

El proyecto utiliza Tailwind CSS para los estilos, proporcionando:

- Diseño responsive
- Tema personalizado con colores corporativos
- Componentes estilizados consistentes

## Desarrollo

Para contribuir al proyecto:

1. Crear una rama para tu característica
2. Implementar los cambios siguiendo los estándares del proyecto
3. Asegurar que el código pasa las validaciones de ESLint
4. Enviar un pull request

## Licencia

Este proyecto está bajo la licencia MIT.
