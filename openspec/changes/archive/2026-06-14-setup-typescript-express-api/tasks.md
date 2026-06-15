## 1. Dependencies and scripts

- [x] 1.1 Install runtime dependencies `express`, `mongoose`, `morgan` and `dotenv`
- [x] 1.2 Install development dependencies `typescript`, `ts-node`, `nodemon`, `@types/node`, `@types/express` and `@types/morgan`
- [x] 1.3 Update `package.json` scripts for `dev`, `watch`, `build` and `type-check`
- [x] 1.4 Confirm `package-lock.json` reflects the installed dependency tree

## 2. TypeScript configuration

- [x] 2.1 Create `tsconfig.json` with `src/` as source root and `dist/` as compiled output
- [x] 2.2 Enable strict TypeScript checks compatible with the project typing conventions
- [x] 2.3 Ensure `npx tsc --noEmit` validates the base configuration

## 3. Environment documentation

- [x] 3.1 Update `.env.example` with base development configuration variables
- [x] 3.2 Keep `src/index.ts` implementation out of scope until the user defines it in a later change

## 4. Verification

- [x] 4.1 Run `npx tsc --noEmit` as minimum verification
- [x] 4.2 Run `npm run build` to verify compiled output is emitted
