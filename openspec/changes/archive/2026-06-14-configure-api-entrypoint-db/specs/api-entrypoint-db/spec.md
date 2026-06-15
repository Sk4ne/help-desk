## ADDED Requirements

### Requirement: Database connection helper is available
El sistema SHALL exponer un helper `connectToDatabase` en `src/db/connectToDb.ts` para establecer la conexion MongoDB mediante Mongoose

#### Scenario: Database connection succeeds
- **WHEN** `connectToDatabase` se ejecuta con `MONGODB_URI` configurado con una URI valida
- **THEN** Mongoose establece la conexion usando esa URI
- **AND** se registra en consola `Connected to database`

#### Scenario: Database URI is missing
- **WHEN** `connectToDatabase` se ejecuta sin `MONGODB_URI`
- **THEN** la funcion captura el error
- **AND** se registra en consola `Error connecting to database`

#### Scenario: Database module is imported
- **WHEN** `src/db/connectToDb.ts` se importa desde el entrypoint
- **THEN** el modulo ejecuta `connectToDatabase()`

### Requirement: API entrypoint initializes runtime dependencies
El sistema SHALL configurar `src/index.ts` como entrypoint TypeScript que carga dotenv, importa el modulo de conexion a base de datos, inicializa Express y registra los middlewares base

#### Scenario: Entrypoint configures Express app
- **WHEN** inicia la API
- **THEN** se inicializa Express en una variable `app`
- **AND** se registra `express.json()`
- **AND** se registra Morgan como logger de solicitudes

#### Scenario: Entrypoint imports database module and starts listener
- **WHEN** inicia la API
- **THEN** `src/index.ts` importa `./db/connectToDb`
- **AND** no declara una funcion auxiliar de arranque como `startServer` ni una funcion equivalente para envolver el flujo de inicio
- **AND** ejecuta `app.listen` directamente desde el entrypoint

### Requirement: API restricts CORS to local frontend
El sistema SHALL configurar CORS para permitir solicitudes solo desde `http://localhost:5127`

#### Scenario: Allowed frontend origin sends request
- **WHEN** una solicitud llega con origen `http://localhost:5127`
- **THEN** CORS permite la solicitud

#### Scenario: Different origin sends request
- **WHEN** una solicitud llega con un origen diferente a `http://localhost:5127`
- **THEN** CORS no permite ese origen

### Requirement: API listens on configured port
El sistema SHALL iniciar el listener HTTP usando `process.env.PORT` y usar `3000` como puerto por defecto

#### Scenario: Port is configured
- **WHEN** `PORT` esta definido
- **THEN** `app.listen(process.env.PORT || 3000, ...)` usa ese valor para iniciar el servidor
- **AND** se registra en consola `Api escuchando en el puerto <PORT>`

#### Scenario: Port is not configured
- **WHEN** `PORT` no esta definido
- **THEN** `app.listen(process.env.PORT || 3000, ...)` usa `3000`
- **AND** se registra en consola `Api escuchando en el puerto 3000`
