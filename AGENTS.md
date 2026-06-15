# Repository guidelines

## Project structure & module organization

This is a Node.js/Express API written mainly in TypeScript; application code lives in `src/`

- `src/index.ts` starts the server
- `src/controllers/`, `src/routes/`, `src/models/`, and `src/validators/` contain the HTTP API layers
- `src/helpers/` contains reusable domain helpers
- `src/interfaces/` and `src/typeAlias/` hold shared TypeScript contracts
- `src/controllers/websocket/` contains Socket.IO notification logic
- `src/swagger/` contains the modular OpenAPI documentation
- Assets are under `src/assets/` and `src/public/`

## Build, test, and development commands

- `npm run dev`: starts the API with `nodemon` and `ts-node` from `src/index.ts`
- `npm run watch`: runs TypeScript in watch mode
- `npx tsc --noEmit`: type-checks the project without writing `dist/`

No `npm test` script is currently defined; use `npx tsc --noEmit` as the minimum verification

## Coding style & naming conventions

Use explicit TypeScript types; reuse interfaces and aliases before creating new ones; place interfaces in `src/interfaces/<module>/`; never define them inside controllers; place type aliases only in `src/typeAlias/<module>/`; if the needed module folder does not exist under `src/typeAlias/`, create it there first; type aliases must never be created outside the `src/typeAlias/` folder

Project-specific typing rules:

- Do not use `any`
- Avoid `as`; prefer correct typing and narrowing
- Type important variables explicitly, especially Mongoose results
- Keep function return types explicit for exported helpers/controllers
- Keep consistency with existing functional-style helper patterns
- Type Mongo ids with `Types.ObjectId`
- For literal values, define one `UPPER_SNAKE_CASE` constant with `as const`, expose a Mongoose-compatible enum object with `values` and `message`, reuse that object in model schema `enum` fields, and derive aliases with `typeof value.values[number]`
- Interfaces use `IName`; type aliases use PascalCase or UpperCamelCase

Example:

```ts
// Avoid
const notification = await NotifyManager.create(body);

// Prefer
const notification: INotifyManager = await NotifyManager.create(body);
```

Follow existing naming patterns: models use PascalCase, helpers/functions use camelCase, and route files are grouped by API version in `src/routes/v1/`

## API, controllers, and models

Controllers must type parameters as `req: Request, res: Response, next: NextFunction` and use `catch (err: unknown)`; handle `MongooseError.ValidationError` when relevant, then return a typed fallback error message; do not call `next(err)` from controller catches

New endpoints must follow REST resource naming and CRUD-style controller names, for example `createIrapi` instead of `calculateIrapi`; route files must not include `/v1`; versioning is configured at the root; successful POST creation responses must use `201` and should not return `ok: true` wrappers

Keep required-field and business validation in `express-validator` files under `src/validators/`, not in Mongoose models; do not add `required: true` or `unique: true`; use `{ timestamps: true }` instead of manually defining `createdAt`; remove unused imports and development logs

For Mongoose enum fields, call the enum object from `src/enums/<module>/` directly in the schema, for example `enum: validTicketStatus`; do not pass raw literal arrays directly in model schemas

## Testing guidelines

When adding behavior, validate TypeScript with:

```bash
npx tsc --noEmit
```

For API changes, also run `npm run dev` and verify the affected endpoint or websocket event manually with realistic payloads

## Markdown documentation

When generating or editing `.md` documentation:

- Do not end every sentence with a period
- Use sentence case for headings; only the first word should be capitalized unless a proper noun requires it
- Do not use horizontal rules like `---`
- Do not use emojis


## Security & configuration

Use `.env.example` as the reference for required environment variables; do not commit real secrets from `.env`; authentication depends on JWT configuration, and websocket clients may pass tokens through handshake auth or `x-token` headers
