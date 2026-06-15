# Help Desk API

API backend para un sistema de mesa de ayuda orientado a clientes de un software SaaS

El proyecto está construido con Node.js, Express, TypeScript y MongoDB mediante Mongoose

Actualmente contiene la base de ejecución del servidor, carga de variables de entorno, conexión a base de datos y estructura inicial para desarrollar los módulos de la V1

## Estado actual

- Servidor Express configurado desde `src/index.ts`
- Carga de variables con `dotenv`
- Middleware JSON habilitado
- Logs HTTP con `morgan`
- CORS configurado para `http://localhost:5127`
- Conexión a MongoDB desde `src/db/connectToDb.ts`
- TypeScript en modo estricto
- Estructura base para controladores, rutas, modelos, validadores, helpers, interfaces, aliases y documentación OpenAPI

## Alcance funcional V1

La V1 busca cubrir un MVP operativo de mesa de ayuda con:

- Autenticación con email, password y JWT
- Portal para clientes
- Panel interno para administradores y soporte
- Creación, consulta, asignación, seguimiento y cierre de tickets
- Comentarios públicos entre cliente y soporte
- Adjuntos PDF e imágenes
- Notificaciones por correo
- Gestión de usuarios, categorías y prioridades
- Exportaciones básicas
- Paginación y filtros en listados
- Soft delete mediante estado interno

La especificación completa está en `documentation/REQUISITOS.md`

## Tecnologías

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- dotenv
- cors
- morgan
- nodemon
- ts-node

## Requisitos

- Node.js compatible con el proyecto
- npm
- Una instancia de MongoDB disponible

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto usando `.env.example` como referencia

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/helpdesk
SECRET_JWT_SEED=your_secret_key
```

Variables disponibles:

- `PORT`: puerto donde se levanta la API
- `MONGODB_URI`: cadena de conexión de MongoDB
- `SECRET_JWT_SEED`: semilla usada para firmar tokens JWT cuando se implemente autenticación

## Scripts disponibles

```bash
npm run dev
```

Inicia la API en modo desarrollo con `nodemon` y `ts-node`

```bash
npm run watch
```

Ejecuta TypeScript en modo observación

```bash
npm run build
```

Compila el proyecto en `dist/`

```bash
npm run type-check
```

Valida tipos sin generar archivos

## Verificación mínima

```bash
npm run type-check
```

El repositorio no define un script `npm test` por ahora, así que la verificación mínima es el chequeo de TypeScript

## Ejecución local

```bash
npm run dev
```

Si `PORT` no está definido, la API usa el puerto `3000`

```text
http://localhost:3000
```

## Estructura del proyecto

```text
src/
├── config/
├── controllers/
├── db/
├── enums/
├── helpers/
├── index.ts
├── interfaces/
├── middlewares/
├── models/
├── routes/
├── swagger/
├── typeAlias/
└── validators/
```

Carpetas principales:

- `src/index.ts`: punto de entrada de la API
- `src/db/`: conexión y utilidades de base de datos
- `src/controllers/`: controladores HTTP
- `src/routes/`: rutas agrupadas por versión
- `src/models/`: modelos Mongoose
- `src/validators/`: validaciones de entrada
- `src/helpers/`: funciones reutilizables de dominio
- `src/interfaces/`: interfaces compartidas
- `src/typeAlias/`: aliases de tipos compartidos
- `src/swagger/`: documentación OpenAPI modular

## Convenciones de desarrollo

- El código del proyecto debe escribirse en inglés
- La documentación funcional y textos visibles pueden estar en español
- Usar TypeScript con tipos explícitos
- No usar `any`
- Evitar `as`; preferir tipado correcto y narrowing
- Los controladores deben usar `Request`, `Response` y `NextFunction`
- Las interfaces deben vivir en `src/interfaces/<module>/`
- Los type aliases deben vivir en `src/typeAlias/<module>/`
- Los modelos usan PascalCase
- Helpers y funciones usan camelCase
- Las rutas versionadas se agrupan en `src/routes/v1/`
- Las validaciones de campos requeridos deben vivir en `src/validators/`

## Documentación adicional

- `documentation/REQUISITOS.md`: especificación funcional y técnica de la V1
- `documentation/ESTRUCTURA_PROYECTO.md`: descripción de carpetas y estructura base
- `openspec/`: especificaciones y cambios archivados del flujo OpenSpec
