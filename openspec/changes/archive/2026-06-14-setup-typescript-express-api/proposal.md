## Why

El proyecto ya tiene una estructura MVC base, pero todavia no cuenta con la configuracion y dependencias necesarias para ejecutar una API Express escrita en TypeScript

Este cambio establece el punto de partida tecnico para desarrollar endpoints, modelos Mongoose y validaciones sin bloquearse por falta de scripts, compilacion o servidor inicial

## What changes

- Agregar dependencias esenciales para la API: Express, Mongoose, Morgan y dotenv
- Agregar soporte para cargar variables de entorno desde `.env`
- Agregar dependencias de desarrollo necesarias para TypeScript, ejecucion en desarrollo y tipos de Node/Express/Morgan
- Crear una configuracion `tsconfig.json` compatible con el proyecto
- Actualizar scripts de `package.json` para desarrollo, watch, build y type-check
- Preparar el uso de variables de entorno desde `.env.example`
- Mantener el alcance limitado a infraestructura base, sin crear recursos de dominio

Non-goals:

- No definir la implementacion de `src/index.ts`
- No configurar el arranque del servidor Express
- No configurar la conexion inicial a MongoDB
- No crear endpoints de negocio para piscinas, plantas, usuarios o tickets
- No implementar autenticacion JWT
- No definir modelos Mongoose de dominio
- No agregar documentacion Swagger funcional de endpoints

## Capabilities

### New capabilities

- `typescript-express-api-runtime`: cubre la capacidad de ejecutar, compilar y validar una API Express con TypeScript usando dependencias base del proyecto

### Modified capabilities

No hay capacidades existentes que modificar

## Impact

- `package.json`: dependencias, devDependencies y scripts
- `package-lock.json`: resolucion de paquetes instalados
- `tsconfig.json`: configuracion de compilacion TypeScript
- `.env.example`: referencia de variables necesarias para iniciar la API
- Flujo de desarrollo: `npm run dev`, `npm run watch`, `npm run build` y `npx tsc --noEmit`
