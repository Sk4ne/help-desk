## ADDED Requirements

### Requirement: Runtime dependencies are available
El proyecto SHALL incluir Express, Mongoose, Morgan y dotenv como dependencias de runtime para que la API tenga disponibles las librerias base cuando se defina su inicializacion

#### Scenario: Runtime dependencies are installed
- **WHEN** se instalan las dependencias desde `package.json`
- **THEN** `express`, `mongoose`, `morgan` y `dotenv` estan disponibles para importar desde archivos TypeScript

### Requirement: TypeScript development tooling is available
El proyecto SHALL incluir herramientas de desarrollo TypeScript y paquetes de tipos necesarios para ejecutar y validar la API durante el desarrollo

#### Scenario: Development tooling is installed
- **WHEN** se instalan las dependencias desde `package.json`
- **THEN** `typescript`, `ts-node`, `nodemon`, `@types/node`, `@types/express` y `@types/morgan` estan disponibles para desarrollo local

### Requirement: TypeScript compiler is configured
El proyecto SHALL incluir una configuracion TypeScript que compile archivos fuente desde `src/` y soporte chequeo estricto de tipos para el codigo de la API

#### Scenario: Type checking succeeds for the base project
- **WHEN** se ejecuta `npx tsc --noEmit` despues de la instalacion
- **THEN** TypeScript valida el proyecto configurado sin emitir salida de build

#### Scenario: Build emits compiled output
- **WHEN** se ejecuta el script de build
- **THEN** TypeScript compila archivos desde `src/` hacia el directorio de salida configurado

### Requirement: Development scripts are available
El proyecto SHALL exponer scripts npm para ejecutar el flujo de desarrollo TypeScript, correr TypeScript en modo watch, generar build de produccion y validar tipos

#### Scenario: Development script uses TypeScript runner
- **WHEN** se ejecuta `npm run dev`
- **THEN** el proyecto usa `nodemon` y `ts-node` para ejecutar el flujo de desarrollo TypeScript configurado

#### Scenario: Watch script runs TypeScript in watch mode
- **WHEN** se ejecuta `npm run watch`
- **THEN** TypeScript inicia en modo watch para el proyecto configurado

#### Scenario: Type-check script validates without output
- **WHEN** se ejecuta el script de type-check
- **THEN** TypeScript valida el proyecto usando `--noEmit`

### Requirement: Runtime entrypoint implementation is deferred
El proyecto SHALL mantener la implementacion concreta de `src/index.ts` fuera de este cambio para que sea definida por una especificacion posterior

#### Scenario: Entry point implementation is not specified
- **WHEN** se revisa este cambio
- **THEN** no define middlewares, listener HTTP, conexion Mongoose ni manejo de arranque dentro de `src/index.ts`

### Requirement: Environment example documents base configuration
El proyecto SHALL documentar variables de entorno base sin exigir desde esta spec como deben ser consumidas por la aplicacion

#### Scenario: Environment variables are documented
- **WHEN** un desarrollador lee `.env.example`
- **THEN** el archivo lista las variables base esperadas para desarrollo sin contener secretos reales
