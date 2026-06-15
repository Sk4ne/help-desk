## 1. Dependencies

- [x] 1.1 Install runtime dependency `cors`
- [x] 1.2 Install development dependency `@types/cors`
- [x] 1.3 Confirm `package-lock.json` reflects the installed dependency tree

## 2. Database connection

- [x] 2.1 Create `src/db/connectToDb.ts`
- [x] 2.2 Implement exported `connectToDatabase` function with explicit `Promise<void>` return type
- [x] 2.3 Read `MONGODB_URI` from environment configuration and report a clear error when missing
- [x] 2.4 Connect to MongoDB using Mongoose
- [x] 2.5 Execute `connectToDatabase()` when the DB module loads

## 3. API entrypoint

- [x] 3.1 Import dotenv, Express, Morgan, CORS and `./db/connectToDb` in `src/index.ts`
- [x] 3.2 Initialize Express in a typed `app` variable
- [x] 3.3 Register `express.json()`, Morgan and CORS configured for `http://localhost:5127`
- [x] 3.4 Trigger database connection by importing `./db/connectToDb`
- [x] 3.5 Remove the `startServer` wrapper function and any equivalent startup wrapper
- [x] 3.6 Start `app.listen` using `process.env.PORT || 3000` directly in the listener call
- [x] 3.7 Log `Api escuchando en el puerto <port>` when the server starts

## 4. Verification

- [x] 4.1 Run `npx tsc --noEmit`
- [x] 4.2 Run `npm run build`
- [x] 4.3 Run `npm run dev` with realistic local environment values and confirm the server imports the DB module and starts the listener
