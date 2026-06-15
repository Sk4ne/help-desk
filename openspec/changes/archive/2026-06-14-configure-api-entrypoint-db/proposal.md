## Why

El proyecto ya tiene dependencias y tooling base, pero todavia falta definir el arranque real de la API y separar la conexion a MongoDB en un modulo propio

Este cambio fija la estructura inicial para iniciar Express, conectar con Mongoose y restringir CORS al frontend local permitido

## What Changes

- Crear `src/db/connectToDb.ts` con una funcion `connectToDatabase` encargada de establecer la conexion MongoDB mediante Mongoose
- Configurar `src/index.ts` como entrypoint TypeScript de la API
- Cargar variables de entorno con dotenv desde el entrypoint
- Inicializar Express en una variable `app`
- Agregar middlewares `express.json()`, `morgan` y `cors`
- Permitir CORS solo desde `http://localhost:5127`
- Ejecutar `connectToDatabase()` desde `src/db/connectToDb.ts` al cargar el modulo
- Importar `./db/connectToDb` desde `src/index.ts`
- Iniciar `app.listen` directamente desde `src/index.ts`, sin declarar una funcion auxiliar de arranque como `startServer`
- Iniciar el servidor usando `app.listen(process.env.PORT || 3000, ...)`
- Agregar `cors` y `@types/cors` si no estan instalados

Non-goals:

- No crear rutas, controladores ni endpoints de negocio
- No implementar autenticacion JWT
- No agregar modelos Mongoose de dominio
- No agregar Swagger funcional para endpoints

## Capabilities

### New Capabilities

- `api-entrypoint-db`: define el entrypoint Express de la API, la conexion inicial a MongoDB y la politica CORS base

### Modified Capabilities

No hay capacidades existentes que modificar

## Impact

- `package.json`: dependencia runtime `cors` y tipos de desarrollo `@types/cors`
- `package-lock.json`: resolucion de paquetes instalados
- `src/db/connectToDb.ts`: helper de conexion MongoDB con ejecucion al cargar el modulo
- `src/index.ts`: inicializacion de dotenv, DB, Express, middlewares, CORS y listener HTTP
- `.env.example`: referencia de `PORT` y `MONGODB_URI` ya usada por el runtime
