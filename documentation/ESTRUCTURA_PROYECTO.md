# Estructura del proyecto

Estructura base creada para una API Node.js con TypeScript siguiendo una arquitectura MVC

```text
.
├── .env
├── .env.example
├── .gitignore
├── notesDev/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── enums/
│   ├── helpers/
│   ├── index.ts
│   ├── interfaces/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── swagger/
│   ├── typeAlias/
│   └── validators/
```

## Descripcion de carpetas

- `src/models/`: modelos de datos
- `src/routes/`: rutas HTTP agrupadas por version
- `src/helpers/`: funciones reutilizables de dominio
- `src/enums/`: constantes y valores literales reutilizables
- `src/controllers/`: controladores de la API
- `src/interfaces/`: contratos TypeScript compartidos
- `src/middlewares/`: middlewares de Express
- `src/swagger/`: documentacion OpenAPI
- `src/validators/`: validaciones con `express-validator`
- `src/typeAlias/`: alias de tipos compartidos
- `src/config/`: configuracion de la aplicacion
- `src/db/`: conexion y utilidades de base de datos
- `notesDev/`: notas internas de desarrollo
