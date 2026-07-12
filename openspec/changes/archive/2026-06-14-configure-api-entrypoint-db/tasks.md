## 1. Dependencias

- [x] 1.1 Instalar la dependencia de runtime `cors`
- [x] 1.2 Instalar la dependencia de desarrollo `@types/cors`
- [x] 1.3 Confirmar que `package-lock.json` refleja el arbol de dependencias instalado

## 2. Conexion a base de datos

- [x] 2.1 Crear `src/db/connectToDb.ts`
- [x] 2.2 Implementar la funcion exportada `connectToDatabase` con tipo de retorno explicito `Promise<void>`
- [x] 2.3 Leer `MONGODB_URI` desde la configuracion de entorno y reportar un error claro cuando falte
- [x] 2.4 Conectar a MongoDB usando Mongoose
- [x] 2.5 Ejecutar `connectToDatabase()` cuando cargue el modulo de DB

## 3. Entrypoint de API

- [x] 3.1 Importar dotenv, Express, Morgan, CORS y `./db/connectToDb` en `src/index.ts`
- [x] 3.2 Inicializar Express en una variable tipada `app`
- [x] 3.3 Registrar `express.json()`, Morgan y CORS configurado para `http://localhost:5127`
- [x] 3.4 Disparar la conexion a base de datos importando `./db/connectToDb`
- [x] 3.5 Eliminar la funcion envoltorio `startServer` y cualquier envoltorio equivalente de arranque
- [x] 3.6 Iniciar `app.listen` usando `process.env.PORT || 3000` directamente en la llamada del listener
- [x] 3.7 Registrar `Api escuchando en el puerto <port>` cuando inicia el servidor

## 4. Verificacion

- [x] 4.1 Ejecutar `npx tsc --noEmit`
- [x] 4.2 Ejecutar `npm run build`
- [x] 4.3 Ejecutar `npm run dev` con valores de entorno locales realistas y confirmar que el servidor importa el modulo de DB e inicia el listener
