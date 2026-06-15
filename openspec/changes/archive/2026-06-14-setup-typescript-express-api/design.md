## Context

El proyecto necesita una base ejecutable para una API REST con Express y TypeScript. La estructura esperada ya define `src/index.ts` como punto de entrada y reserva carpetas para controladores, rutas, modelos, validadores, helpers, interfaces, aliases y Swagger

Actualmente el cambio se limita a infraestructura inicial: dependencias, scripts, compilacion TypeScript y referencia de variables de entorno. No define la implementacion de `src/index.ts`, controladores, rutas versionadas, conexion MongoDB, modelos de dominio, validadores ni documentacion Swagger funcional porque esos recursos dependen de capacidades futuras

## Goals / Non-Goals

**Goals:**

- Instalar Express, Mongoose, Morgan y dotenv como dependencias de runtime
- Instalar TypeScript, `ts-node`, `nodemon` y tipos necesarios como dependencias de desarrollo
- Definir `tsconfig.json` para compilar `src/` hacia `dist/` con chequeo estricto razonable para el inicio del proyecto
- Definir scripts para desarrollo, watch, build y type-check
- Documentar variables requeridas en `.env.example`

**Non-Goals:**

- Definir como debe quedar `src/index.ts`
- Configurar el arranque del servidor Express
- Configurar middlewares, listener HTTP o conexion Mongoose
- Crear endpoints de negocio, controladores CRUD, validadores o rutas versionadas
- Crear modelos Mongoose de piscinas, plantas, usuarios o tickets
- Implementar autenticacion JWT o autorizacion
- Agregar specs Swagger de endpoints
- Definir interfaces o type aliases de dominio

## Decisions

1. Dejar `src/index.ts` fuera del alcance de este cambio

   Rationale: el proyecto ya reserva ese archivo como entrada, pero su contenido requiere una decision posterior del usuario. Este cambio solo prepara la base de Node.js y TypeScript

   Alternatives considered: definir un servidor Express minimo desde este cambio. Se descarta porque adelanta una decision de implementacion que debe especificarse despues

2. Configurar scripts npm explicitos

   Rationale: `dev`, `watch`, `build` y `type-check` cubren el ciclo minimo para trabajar en TypeScript. `dev` debe usar el runner de desarrollo TypeScript configurado; `watch` debe delegar a TypeScript; `build` debe emitir a `dist`; `type-check` debe usar `tsc --noEmit`

   Alternatives considered: usar `tsx` o `ts-node-dev`. Se prefiere `ts-node` con `nodemon` porque esta alineado con los comandos documentados del repositorio

3. Mantener TypeScript estricto sin crear tipos de dominio innecesarios

   Rationale: la configuracion debe impedir `any` implicito, validar imports y permitir tipos explicitos en el codigo inicial. Como no se crean controladores, modelos o helpers de dominio, no corresponde agregar interfaces en `src/interfaces/` ni aliases en `src/typeAlias/`

   Alternatives considered: relajar `strict` para acelerar el arranque. Se descarta porque el proyecto exige tipado explicito y evitar `any`

4. Documentar variables de entorno sin definir su consumo en runtime

   Rationale: `.env.example` debe servir como referencia de configuracion esperada y evitar secretos reales en el repositorio. La forma exacta de consumir esas variables pertenece a la futura definicion de `src/index.ts`

   Alternatives considered: exigir desde esta spec que `src/index.ts` lea `PORT` y `MONGODB_URI`. Se descarta porque el usuario definira despues el arranque de la aplicacion

## Risks / Trade-offs

- `npm run dev` puede depender de que `src/index.ts` exista y compile, pero este cambio no define su contenido
- La conexion MongoDB y el arranque Express quedan pendientes hasta que el usuario indique como debe quedar `src/index.ts`
- Dependencias instaladas pueden cambiar el lockfile -> esperado para una configuracion inicial, debe revisarse junto con `package.json`
