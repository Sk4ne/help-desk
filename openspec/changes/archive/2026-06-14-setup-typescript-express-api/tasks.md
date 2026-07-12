## 1. Dependencias y scripts

- [x] 1.1 Instalar dependencias de runtime `express`, `mongoose`, `morgan` y `dotenv`
- [x] 1.2 Instalar dependencias de desarrollo `typescript`, `ts-node`, `nodemon`, `@types/node`, `@types/express` y `@types/morgan`
- [x] 1.3 Actualizar los scripts de `package.json` para `dev`, `watch`, `build` y `type-check`
- [x] 1.4 Confirmar que `package-lock.json` refleja el arbol de dependencias instalado

## 2. Configuracion de TypeScript

- [x] 2.1 Crear `tsconfig.json` con `src/` como raiz de codigo fuente y `dist/` como salida compilada
- [x] 2.2 Habilitar chequeos estrictos de TypeScript compatibles con las convenciones de tipado del proyecto
- [x] 2.3 Asegurar que `npx tsc --noEmit` valida la configuracion base

## 3. Documentacion de entorno

- [x] 3.1 Actualizar `.env.example` con variables base de configuracion de desarrollo
- [x] 3.2 Mantener la implementacion de `src/index.ts` fuera de alcance hasta que el usuario la defina en un cambio posterior

## 4. Verificacion

- [x] 4.1 Ejecutar `npx tsc --noEmit` como verificacion minima
- [x] 4.2 Ejecutar `npm run build` para verificar que se emite la salida compilada
