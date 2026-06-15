## Context

El proyecto ya cuenta con dependencias base para Express, Mongoose, Morgan, dotenv y TypeScript, pero el arranque de la API y la conexion MongoDB deben quedar definidos de forma explicita

La conexion a la base de datos debe vivir fuera del entrypoint para mantener `src/index.ts` enfocado en inicializacion de runtime, middlewares y listener HTTP

## Goals / Non-Goals

**Goals:**

- Crear un modulo `src/db/connectToDb.ts` para la conexion MongoDB
- Exportar una funcion `connectToDatabase` con retorno `Promise<void>`
- Usar Mongoose para establecer la conexion usando `MONGODB_URI`
- Configurar `src/index.ts` como entrypoint TypeScript de Express
- Cargar dotenv, conectar a la DB, configurar JSON, Morgan y CORS
- Permitir CORS solo desde `http://localhost:5127`
- Ejecutar `connectToDatabase()` desde `src/db/connectToDb.ts` al cargar el modulo
- Importar `./db/connectToDb` desde `src/index.ts`
- Iniciar `app.listen(process.env.PORT || 3000, ...)` sin envolver el arranque en una funcion `startServer`

**Non-Goals:**

- Crear rutas, controladores, modelos o validadores de dominio
- Implementar autenticacion o autorizacion
- Configurar Swagger
- Agregar manejo global de errores HTTP

## Decisions

1. Separar la conexion MongoDB en `src/db/connectToDb.ts`

   Rationale: evita mezclar configuracion de infraestructura con la inicializacion de Express y deja una funcion reutilizable para futuros tests o arranques alternativos

   Alternatives considered: conectar directamente desde `src/index.ts`. Se descarta porque acopla el entrypoint a los detalles de Mongoose

2. Usar `connectToDatabase` como funcion async tipada y ejecutarla al cargar el modulo

   Rationale: el modulo `src/db/connectToDb.ts` concentra la conexion MongoDB y dispara el intento de conexion cuando `src/index.ts` importa `./db/connectToDb`

   Alternatives considered: importar `connectToDatabase` desde `src/index.ts` y encadenar `app.listen` despues de la promesa. Se descarta para mantener el entrypoint con una importacion simple del modulo de DB

3. Mantener el flujo de arranque directo en `src/index.ts`

   Rationale: el entrypoint debe cargar el modulo de conexion y ejecutar `app.listen(process.env.PORT || 3000, ...)` sin una funcion auxiliar como `startServer`

   Alternatives considered: envolver el arranque en una funcion `startServer`. Se descarta porque oculta el flujo que se quiere dejar visible en el entrypoint

4. Configurar CORS con origen unico

   Rationale: el frontend local permitido es `http://localhost:5127`, por lo que la API no debe aceptar origenes arbitrarios en esta base

   Alternatives considered: habilitar CORS abierto. Se descarta por seguridad y porque contradice el origen indicado

5. Mantener el entrypoint en `src/index.ts`

   Rationale: el proyecto TypeScript ejecuta `src/index.ts` con `ts-node`, aunque el requerimiento mencione `index.js`

   Alternatives considered: crear `src/index.js`. Se descarta porque rompe la configuracion TypeScript existente

## Risks / Trade-offs

- `cors` no instalado -> agregar `cors` y `@types/cors` antes de importar el middleware
- `MONGODB_URI` faltante -> `connectToDatabase` debe registrar un error claro desde el modulo de conexion
- `PORT` no definido -> usar puerto por defecto `3000`
- Mensaje de `listen` con interpolacion incorrecta -> corregir la sintaxis para imprimir `process.env.PORT || 3000`
- La conexion MongoDB se dispara como efecto lateral de importacion -> el listener HTTP puede iniciar mientras la conexion sigue pendiente
