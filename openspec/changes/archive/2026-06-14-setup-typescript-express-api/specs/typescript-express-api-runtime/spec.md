## ADDED Requirements

### Requirement: Dependencias de runtime disponibles
El proyecto SHALL incluir Express, Mongoose, Morgan y dotenv como dependencias de runtime para que la API tenga disponibles las librerias base cuando se defina su inicializacion

#### Scenario: Dependencias de runtime instaladas
- **WHEN** se instalan las dependencias desde `package.json`
- **THEN** `express`, `mongoose`, `morgan` y `dotenv` estan disponibles para importar desde archivos TypeScript

### Requirement: Herramientas de desarrollo TypeScript disponibles
El proyecto SHALL incluir herramientas de desarrollo TypeScript y paquetes de tipos necesarios para ejecutar y validar la API durante el desarrollo

#### Scenario: Herramientas de desarrollo instaladas
- **WHEN** se instalan las dependencias desde `package.json`
- **THEN** `typescript`, `ts-node`, `nodemon`, `@types/node`, `@types/express` y `@types/morgan` estan disponibles para desarrollo local

### Requirement: Compilador TypeScript configurado
El proyecto SHALL incluir una configuracion TypeScript que compile archivos fuente desde `src/` y soporte chequeo estricto de tipos para el codigo de la API

#### Scenario: Chequeo de tipos exitoso para el proyecto base
- **WHEN** se ejecuta `npx tsc --noEmit` despues de la instalacion
- **THEN** TypeScript valida el proyecto configurado sin emitir salida de build

#### Scenario: Build emite salida compilada
- **WHEN** se ejecuta el script de build
- **THEN** TypeScript compila archivos desde `src/` hacia el directorio de salida configurado

### Requirement: Scripts de desarrollo disponibles
El proyecto SHALL exponer scripts npm para ejecutar el flujo de desarrollo TypeScript, correr TypeScript en modo watch, generar build de produccion y validar tipos

#### Scenario: Script de desarrollo usa runner TypeScript
- **WHEN** se ejecuta `npm run dev`
- **THEN** el proyecto usa `nodemon` y `ts-node` para ejecutar el flujo de desarrollo TypeScript configurado

#### Scenario: Script watch ejecuta TypeScript en modo watch
- **WHEN** se ejecuta `npm run watch`
- **THEN** TypeScript inicia en modo watch para el proyecto configurado

#### Scenario: Script type-check valida sin salida
- **WHEN** se ejecuta el script de type-check
- **THEN** TypeScript valida el proyecto usando `--noEmit`

### Requirement: Implementacion del entrypoint de runtime diferida
El proyecto SHALL mantener la implementacion concreta de `src/index.ts` fuera de este cambio para que sea definida por una especificacion posterior

#### Scenario: Implementacion del entrypoint no especificada
- **WHEN** se revisa este cambio
- **THEN** no define middlewares, listener HTTP, conexion Mongoose ni manejo de arranque dentro de `src/index.ts`

### Requirement: Ejemplo de entorno documenta configuracion base
El proyecto SHALL documentar variables de entorno base sin exigir desde esta spec como deben ser consumidas por la aplicacion

#### Scenario: Variables de entorno documentadas
- **WHEN** un desarrollador lee `.env.example`
- **THEN** el archivo lista las variables base esperadas para desarrollo sin contener secretos reales
